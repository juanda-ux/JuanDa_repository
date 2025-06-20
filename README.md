# JuanDa_repository

This repository now includes a simple digital product marketplace built with Flask.

## Running the web application

1. Install Python dependencies (preferably in a virtual environment):

```bash
pip install -r web_app/requirements.txt
```

2. Set environment variables for Stripe keys (they can be placed in a `.env` file) using your Stripe dashboard values:

```bash
export STRIPE_SECRET_KEY=sk_test_your_key
export STRIPE_PUBLIC_KEY=pk_test_your_key
export STRIPE_CLIENT_ID=ca_your_client_id
```

3. Run the application:

```bash
python web_app/app.py
```

The app uses SQLite to store data and will create `web_app/app.db` on first run.

Users can register, upload digital files, and create product pages that accept
Stripe payments. After a successful payment the buyer receives a download link
for the purchased file.

Public product pages use clean URLs of the form `/u/<username>/p/<product-slug>`
and each user has a profile page at `/u/<username>` listing their products.

Creators must connect their Stripe account from the dashboard using the
"Connect Stripe" button in order to sell products. Payments will be processed
through Stripe Connect Standard.

### Optional mail configuration

Emails are sent using Flask-Mail. During development the default settings send
emails to the console. To use a real SMTP server set these variables:

```bash
export MAIL_SERVER=smtp.example.com
export MAIL_PORT=587
export MAIL_USERNAME=your_user
export MAIL_PASSWORD=your_pass
export MAIL_DEFAULT_SENDER=no-reply@example.com
```
