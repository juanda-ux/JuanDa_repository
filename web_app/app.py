import os
import uuid

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    send_from_directory,
)
from flask_login import (
    LoginManager,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import stripe
from slugify import slugify
from flask_mail import Mail, Message

from models import db, User, Product, Purchase
from sqlalchemy import or_, func
from config import Config
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
mail = Mail(app)

stripe.api_key = app.config['STRIPE_SECRET_KEY']

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/')
def index():
    query = request.args.get('q')
    products_q = Product.query
    if query:
        like = f"%{query}%"
        products_q = products_q.filter(
            db.or_(Product.title.ilike(like), User.username.ilike(like))
        ).join(User)
    products = products_q.order_by(Product.created_at.desc()).all()
    return render_template('index.html', products=products, query=query)


@app.route('/u/<username>')
def user_profile(username):
    user = User.query.filter_by(username=username).first_or_404()
    total_sales = db.session.query(db.func.count(Purchase.id)).join(Product).filter(Product.user_id == user.id).scalar()
    return render_template('profile.html', user=user, total_sales=total_sales)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
            flash('Email or username already registered')
            return redirect(url_for('register'))
        user = User(username=username, email=email, password=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()
        login_user(user)
        # send welcome email
        msg = Message('Welcome to Digital Market', recipients=[user.email])
        msg.body = 'Thanks for joining our marketplace!'
        mail.send(msg)
        return redirect(url_for('dashboard'))
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Invalid credentials')
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    products = Product.query.filter_by(owner=current_user).all()
    product_count = len(products)
    total_sales = db.session.query(func.count(Purchase.id)).join(Product).filter(Product.user_id == current_user.id).scalar() or 0
    revenue_cents = db.session.query(func.coalesce(func.sum(Product.price_cents), 0)).join(Purchase).filter(Product.user_id == current_user.id).scalar() or 0
    revenue = revenue_cents / 100
    return render_template('dashboard.html', products=products,
                           product_count=product_count, total_sales=total_sales,
                           revenue=revenue)


@app.route('/connect-stripe')
@login_required
def connect_stripe():
    """Redirect the user to Stripe's OAuth flow to connect their account."""
    if not app.config['STRIPE_CLIENT_ID']:
        flash('Stripe client ID not configured')
        return redirect(url_for('dashboard'))

    redirect_uri = url_for('stripe_oauth_callback', _external=True)
    url = (
        'https://connect.stripe.com/oauth/authorize?response_type=code'
        f'&client_id={app.config["STRIPE_CLIENT_ID"]}'
        f'&scope=read_write&redirect_uri={redirect_uri}'
    )
    return redirect(url)


@app.route('/stripe-oauth-callback')
@login_required
def stripe_oauth_callback():
    code = request.args.get('code')
    if not code:
        flash('Stripe connection failed')
        return redirect(url_for('dashboard'))

    try:
        resp = stripe.OAuth.token(grant_type='authorization_code', code=code)
        current_user.stripe_user_id = resp['stripe_user_id']
        db.session.commit()
        flash('Stripe account connected')
    except Exception as e:
        flash('Error connecting Stripe account')
    return redirect(url_for('dashboard'))


@app.route('/product/new', methods=['GET', 'POST'])
@login_required
def new_product():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        price_cents = int(float(request.form['price']) * 100)
        file = request.files['file']
        if not file:
            flash('File required')
            return redirect(request.url)
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        slug_base = slugify(title)
        slug_val = slug_base
        counter = 1
        while Product.query.filter_by(slug=slug_val).first():
            slug_val = f"{slug_base}-{counter}"
            counter += 1
        product = Product(user_id=current_user.id, title=title,
                          slug=slug_val,
                          description=description, price_cents=price_cents,
                          filename=filename)
        db.session.add(product)
        db.session.commit()
        return redirect(url_for('dashboard'))
    return render_template('new_product.html')


@app.route('/u/<username>/p/<slug>')
def product_detail(username, slug):
    user = User.query.filter_by(username=username).first_or_404()
    product = Product.query.filter_by(owner=user, slug=slug).first_or_404()
    return render_template('product.html', product=product,
                           stripe_public_key=app.config['STRIPE_PUBLIC_KEY'])


@app.route('/create-checkout-session/<int:product_id>', methods=['POST'])
@login_required
def create_checkout_session(product_id):
    product = Product.query.get_or_404(product_id)
    if not product.owner.stripe_user_id:
        flash('Seller has not connected Stripe account.')
        return redirect(url_for('product_detail', username=product.owner.username, slug=product.slug))

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'unit_amount': product.price_cents,
                'product_data': {
                    'name': product.title,
                },
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url=url_for('payment_success', product_id=product.id,
                            _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=url_for('product_detail', username=product.owner.username, slug=product.slug,
                           _external=True),
        stripe_account=product.owner.stripe_user_id
    )
    return redirect(session.url)


@app.route('/payment-success/<int:product_id>')
@login_required
def payment_success(product_id):
    session_id = request.args.get('session_id')
    if not session_id:
        flash('Missing session')
        product = Product.query.get_or_404(product_id)
        return redirect(url_for('product_detail', username=product.owner.username, slug=product.slug))
    session = stripe.checkout.Session.retrieve(session_id)
    if session.payment_status == 'paid':
        token = uuid.uuid4().hex
        purchase = Purchase(product_id=product_id, user_id=current_user.id,
                            download_token=token)
        db.session.add(purchase)
        db.session.commit()
        msg = Message('Purchase confirmation', recipients=[current_user.email])
        link = url_for('download_file', token=token, _external=True)
        msg.body = f'Thank you for your purchase. Download your file: {link}'
        mail.send(msg)
        return render_template('success.html', token=token, product_id=product_id)
    flash('Payment not completed')
    product = Product.query.get_or_404(product_id)
    return redirect(url_for('product_detail', username=product.owner.username, slug=product.slug))


@app.route('/download/<token>')
@login_required
def download_file(token):
    purchase = Purchase.query.filter_by(download_token=token,
                                        user_id=current_user.id).first_or_404()
    return send_from_directory(UPLOAD_FOLDER,
                               purchase.product.filename,
                               as_attachment=True)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('500.html'), 500


if __name__ == '__main__':
    app.run(debug=True)
