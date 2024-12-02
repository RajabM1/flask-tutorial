from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
)
from app.config import Config
from app.blueprints.user.models import User


def generate_tokens(identity):
    access_token = create_access_token(
        identity=identity, expires_delta=Config.JWT_ACCESS_TOKEN_EXPIRES
    )
    refresh_token = create_refresh_token(identity=identity)
    return [access_token, refresh_token]


def get_current_user():
    identity = get_jwt_identity()
    return User.query.filter_by(username=identity).first()
