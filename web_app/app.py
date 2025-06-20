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

from models import db, User, Product, Purchase
from config import Config
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

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
    products = Product.query.order_by(Product.created_at.desc()).all()
    return render_template('index.html', products=products)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))
        user = User(email=email, password=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()
        login_user(user)
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
    return render_template('dashboard.html', products=products)


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
        product = Product(user_id=current_user.id, title=title,
                          description=description, price_cents=price_cents,
                          filename=filename)
        db.session.add(product)
        db.session.commit()
        return redirect(url_for('dashboard'))
    return render_template('new_product.html')


@app.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product.html', product=product,
                           stripe_public_key=app.config['STRIPE_PUBLIC_KEY'])


@app.route('/create-checkout-session/<int:product_id>', methods=['POST'])
@login_required
def create_checkout_session(product_id):
    product = Product.query.get_or_404(product_id)
    if not product.owner.stripe_user_id:
        flash('Seller has not connected Stripe account.')
        return redirect(url_for('product_detail', product_id=product_id))

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
        cancel_url=url_for('product_detail', product_id=product.id,
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
        return redirect(url_for('product_detail', product_id=product_id))
    session = stripe.checkout.Session.retrieve(session_id)
    if session.payment_status == 'paid':
        token = uuid.uuid4().hex
        purchase = Purchase(product_id=product_id, user_id=current_user.id,
                            download_token=token)
        db.session.add(purchase)
        db.session.commit()
        return render_template('success.html', token=token, product_id=product_id)
    flash('Payment not completed')
    return redirect(url_for('product_detail', product_id=product_id))


@app.route('/download/<token>')
@login_required
def download_file(token):
    purchase = Purchase.query.filter_by(download_token=token,
                                        user_id=current_user.id).first_or_404()
    return send_from_directory(UPLOAD_FOLDER,
                               purchase.product.filename,
                               as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
