from app.blueprints.auth import auth_bp
from app.utils.auth_helpers import generate_tokens, get_current_user
from app.blueprints.auth.schemas import AuthSchema
from app.blueprints.auth import services
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_schema = AuthSchema(exclude=["id"])


@auth_bp.route("/register", methods=["POST"])
def register():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user, [access_token, refresh_token] = services.register_user(json_data)

    return (
        jsonify(
            {
                "message": "User registered successful",
                "data": {
                    "current_user": auth_schema.dump(user),
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
            }
        ),
        201,
    )


@auth_bp.route("/login", methods=["POST"])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user, [access_token, refresh_token] = services.login_user(json_data)
    if user:
        return (
            jsonify(
                {
                    "message": "User logged in successful",
                    "data": {
                        "current_user": auth_schema.dump(user),
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                    },
                }
            ),
            200,
        )

    return jsonify({"message": "Invalid Username or Password"}), 401


@auth_bp.route("/refresh-token", methods=["GET"])
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    access_token = generate_tokens(identity=identity)[0]
    return (
        jsonify(
            {
                "message": "Access token refreshed",
                "data": {"access_token": access_token},
            }
        ),
        200,
    )


@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    services.logout_user()
    return jsonify({"message": "Successfully logged out"}), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user_information():
    current_user = get_current_user()

    if current_user:
        return (
            jsonify(
                {
                    "message": "Current user fetched successfully",
                    "data": {"current_user": auth_schema.dump(current_user)},
                }
            ),
            200,
        )

    return jsonify({"message": "User not found"}), 404
