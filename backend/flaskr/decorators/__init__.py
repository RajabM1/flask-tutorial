from flaskr.views import jsonify, get_jwt
from functools import wraps


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            identity = get_jwt()
            if identity.get("is_admin"):
                return fn(*args, **kwargs)
            else:
                return jsonify({"message": "Admin access required"}), 401

        return decorator

    return wrapper
