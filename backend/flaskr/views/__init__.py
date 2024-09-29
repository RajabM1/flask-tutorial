from flask import jsonify, request
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
)
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError

PREFIX = "/api/v1"