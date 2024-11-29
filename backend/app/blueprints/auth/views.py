from app.extensions import db
from app.blueprints.auth import auth_bp
from app.blueprints.auth.models import TokenBlacklist
from app.blueprints.auth.helpers import generate_tokens
from app.blueprints.auth.schemas import AuthSchema
from app.blueprints.user.models import User
from datetime import datetime
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

auth_schema = AuthSchema(exclude=["id"])


@auth_bp.route("/register", methods=["POST"])
def register():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_user = auth_schema.load(json_data)
    new_user.password = json_data["password"]
    new_user.last_login_at = datetime.now()

    db.session.add(new_user)
    db.session.commit()
    [access_token, refresh_token] = generate_tokens(new_user.username)
    return (
        jsonify(
            current_user=auth_schema.dump(new_user),
            access_token=access_token,
            refresh_token=refresh_token,
        ),
        201,
    )


@auth_bp.route("/login", methods=["POST"])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = User.query.filter_by(username=json_data["username"]).first()
    if user and user.check_password(json_data["password"]):
        user.last_login_at = datetime.now()
        db.session.commit()
        [access_token, refresh_token] = generate_tokens(user.username)
        return (
            jsonify(
                current_user=auth_schema.dump(user),
                access_token=access_token,
                refresh_token=refresh_token,
            ),
            200,
        )

    return jsonify({"message": "Invalid Username or Password"}), 401


@auth_bp.route("/refresh", methods=["GET"])
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    access_token = generate_tokens(identity=identity)[0]
    return jsonify(access_token=access_token), 200


@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout_user():
    jti = get_jwt()["jti"]
    identity = get_jwt_identity()
    TokenBlacklist.insert_or_update(identity, jti)
    return jsonify({"message": "Successfully logged out"}), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user_information():
    current_user = get_jwt_identity()

    user_info = User.query.filter_by(username=current_user).first()
    if user_info:
        return jsonify(current_user=auth_schema.dump(user_info)), 200

    return jsonify({"message": "User not found"}), 404
