from flask import Flask
from stripe import stripe
from app.blueprints import register_blueprints
from app.extensions import configure_extensions


def create_app(config_class):
    app = Flask(__name__)

    app.config.from_object(config_class)

    configure_extensions(app)

    stripe.api_key = app.config["STRIPE_SECRET_KEY"]

    register_blueprints(app)

    return app
