from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from .views import jsonify, SQLAlchemyError, ValidationError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
app.config["SECRET_KEY"] = "4a90e28d582d5cce03ec50a5"
app.config["JWT_SECRET_KEY"] = "super-secret"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"
ma = Marshmallow()
jwt = JWTManager(app)

from . import routes
from .views import item_views, auth_views


@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "user1":
        return {"is_admin": True}
    return {"is_admin": False}


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    from .models.jwt import TokenBlacklist
    jwt_obj = TokenBlacklist.query.filter_by(jti=jti).first()
    if not jwt_obj:
        return False
    return jwt_obj.is_expired


@app.errorhandler(SQLAlchemyError)
def handle_sqlalchemy_error(err):
    return (jsonify({"error": "A database error occurred.", "message": str(err)}), 500)


@app.errorhandler(ValidationError)
def handle_validation_error(err):
    return jsonify({"error": "A Validation Error occurred.", "message": str(err)}), 400