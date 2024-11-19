from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from stripe import stripe
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

app = Flask(__name__)

app.config.from_object("config.DevelopmentConfig")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"
ma = Marshmallow()
jwt = JWTManager(app)
stripe.api_key = app.config["STRIPE_SECRET_KEY"]
CORS(app)


@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "user1":
        return {"is_admin": True}
    return {"is_admin": False}


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    from .models.auth.jwt import TokenBlacklist

    jwt_obj = TokenBlacklist.query.filter_by(jti=jti).first()
    if not jwt_obj:
        return False
    return jwt_obj.is_expired


@app.errorhandler(SQLAlchemyError)
def handle_sqlalchemy_error(err):
    db.session.rollback()
    return (jsonify({"error": "A database error occurred.", "message": str(err)}), 500)


@app.errorhandler(ValidationError)
def handle_validation_error(err):
    return jsonify({"error": "A Validation Error occurred.", "message": str(err)}), 400


@app.errorhandler(ValueError)
def handle_value_error(err):
    return jsonify({"error": "A validation error occurred.", "message": str(err)}), 400
