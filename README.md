# JuanDa_repository

This repository now includes a simple digital product marketplace built with Flask.

## Running the web application

1. Install Python dependencies (preferably in a virtual environment):

```bash
pip install -r web_app/requirements.txt
```

2. Set environment variables for Stripe keys (you can obtain test keys from the Stripe dashboard):

```bash
export STRIPE_SECRET_KEY=sk_test_your_key
export STRIPE_PUBLIC_KEY=pk_test_your_key
```

3. Run the application:

```bash
python web_app/app.py
```

The app uses SQLite to store data and will create `web_app/app.db` on first run.

Users can register, upload digital files, and create product pages that accept
Stripe payments. After a successful payment the buyer receives a download link
for the purchased file.
