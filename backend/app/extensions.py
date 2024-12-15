from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from app.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
ma = Marshmallow()
jwt = JWTManager()
cors = CORS()
mail = Mail()
serializer = URLSafeTimedSerializer(Config.SECRET_KEY)


def configure_extensions(app):
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    mail.init_app(app)
