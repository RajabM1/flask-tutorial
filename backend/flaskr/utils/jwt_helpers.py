from datetime import timedelta
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)


def generate_tokens(identity):
    access_token = create_access_token(
        identity=identity, expires_delta=JWT_ACCESS_TOKEN_EXPIRES
    )
    refresh_token = create_refresh_token(identity=identity)
    return [ access_token, refresh_token ]

