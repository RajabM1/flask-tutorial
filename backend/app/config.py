import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
    STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")
    PREFIX = os.getenv("API_PREFIX")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = os.getenv("MAIL_PORT")
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")

class DevelopmentConfig(Config):
    DEBUG = True
    MAIL_DEBUG = False


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    MAIL_DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    MAIL_DEBUG = False
