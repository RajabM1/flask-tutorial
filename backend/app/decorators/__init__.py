from flask import jsonify
from flask_jwt_extended import jwt_required
from functools import wraps
from app.blueprints.auth.helpers import get_current_user
from app.blueprints.user.enums import UserRole


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            current_user = get_current_user()
            if current_user.role == UserRole.ADMIN:
                return fn(*args, **kwargs)
            else:
                return jsonify({"message": "Admin access required"}), 403

        return decorator

    return wrapper
