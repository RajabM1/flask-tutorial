from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
from functools import wraps


# Custom decorator that checks if the user has admin privileges based on the JWT
def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            identity = get_jwt()
            if identity.get("is_admin"):
                return fn(*args, **kwargs)
            else:
                return jsonify({"message": "Admin access required"}), 401

        return decorator

    return wrapper
