from datetime import datetime
from app.extensions import db
from app.blueprints.user.models import User
from app.blueprints.auth.models import TokenBlacklist
from app.utils.auth_helpers import generate_tokens
from app.blueprints.auth.schemas import AuthSchema
from flask_jwt_extended import get_jwt, get_jwt_identity

auth_schema = AuthSchema(exclude=["id"])


def register_user(json_data):
    new_user = auth_schema.load(json_data)
    new_user.password = json_data["password"]
    new_user.last_login_at = datetime.now()

    db.session.add(new_user)
    db.session.commit()
    return new_user, generate_tokens(new_user.username)


def login_user(json_data):
    user = User.query.filter_by(username=json_data["username"]).first()
    if user and user.check_password(json_data["password"]):
        user.last_login_at = datetime.now()
        db.session.commit()
        return user, generate_tokens(user.username)
    return None, [None, None]


def logout_user():
    jti = get_jwt()["jti"]
    identity = get_jwt_identity()
    TokenBlacklist.insert_or_update(identity, jti)
