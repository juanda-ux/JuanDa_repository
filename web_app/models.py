from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime


db = SQLAlchemy()


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    # ID of the connected Stripe account obtained via OAuth
    stripe_user_id = db.Column(db.String(120))
    avatar_url = db.Column(db.String(256))
    bio = db.Column(db.Text)
    products = db.relationship('Product', backref='owner', lazy=True)
    purchases = db.relationship('Purchase', backref='buyer', lazy=True)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price_cents = db.Column(db.Integer, nullable=False)
    filename = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    download_token = db.Column(db.String(64), unique=True, nullable=False)

    product = db.relationship('Product')

