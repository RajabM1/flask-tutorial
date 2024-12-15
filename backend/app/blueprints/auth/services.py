from datetime import datetime
from app.extensions import db, serializer
from app.blueprints.user.models import User
from app.blueprints.auth.models import TokenBlacklist
from app.utils.auth_helpers import generate_tokens
from app.blueprints.auth.schemas import AuthSchema
from flask_jwt_extended import get_jwt, get_jwt_identity
from app.utils import mail_helpers
from itsdangerous import SignatureExpired, BadSignature

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


def forget_password(json_data):
    user = User.query.filter_by(email=json_data["email"]).first()
    if not user:
        return

    reset_data = {
        "recipients": user.email,
        "salt": "reset-password",
        "reset_url": "http://localhost:5173/auth/reset-password/",
        "subject": "Password Reset Request",
        "body": "Click the link to reset your password:",
    }
    mail_helpers.send_mail(reset_data)


def reset_password(token, new_password):
    try:
        email = serializer.loads(token, salt="reset-password", max_age=600)
        current_user = User.query.filter_by(email=email).first()
        if not current_user:
            return {"message": "Something went wrong, Please try again"}, 400
        current_user.password = new_password
        db.session.commit()
    except SignatureExpired:
        return {"message": "The reset link has expired."}, 400
    except BadSignature:
        return {"message": "Invalid or tampered token."}, 400
