from flaskr import app, db
from . import *
from ..models.user import User
from ..models.jwt import TokenBlacklist

from ..schemas.auth_schema import AuthSchema
from ..utils.jwt_helpers import generate_tokens

auth_schema = AuthSchema()


@app.route(f"{PREFIX}/auth/register", methods=["POST"])
def register():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_user = auth_schema.load(json_data)
    new_user.password = json_data["password_hash"]

    db.session.add(new_user)
    db.session.commit()
    [access_token, refresh_token] = generate_tokens(new_user.username)
    return (
        jsonify(
            {
                "user": auth_schema.dump(new_user),
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
        ),
        201,
    )


@app.route(f"{PREFIX}/auth/login", methods=["POST"])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = User.query.filter_by(username=json_data["username"]).first()
    if user:
        if user.check_password(json_data["password_hash"]):
            [access_token, refresh_token] = generate_tokens(user.username)
            return (
                jsonify(
                    message="Login Successful",
                    access_token=access_token,
                    refresh_token=refresh_token,
                ),
                200,
            )

    return jsonify("Invalid email or Password"), 401


@app.get(f"{PREFIX}/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    new_access_token = generate_tokens(identity=identity)
    return jsonify({"access_token": new_access_token})


@app.route(f"{PREFIX}/auth/logout", methods=["DELETE"])
@jwt_required()
def logout_user():
    jti = get_jwt()["jti"]
    identity = get_jwt_identity()
    TokenBlacklist.insert_or_update(identity, jti)
    return jsonify({"message": "Successfully logged out"}), 200
