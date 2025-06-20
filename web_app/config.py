import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'devsecretkey')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
    STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY')
    # OAuth client ID for Stripe Connect Standard
    STRIPE_CLIENT_ID = os.environ.get('STRIPE_CLIENT_ID')
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'localhost')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 25))
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'noreply@example.com')
