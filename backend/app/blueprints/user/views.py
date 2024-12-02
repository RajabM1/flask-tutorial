from app.decorators import admin_required
from app.blueprints.user import users_bp
from app.blueprints.auth.schemas import AuthSchema
from app.utils.auth_helpers import get_current_user
from app.blueprints.user.schemas import UserAddressSchema
from app.blueprints.user import services
from flask import jsonify, request
from flask_jwt_extended import jwt_required

users_schema = AuthSchema(many=True)
user_address_schema = UserAddressSchema()


@users_bp.route("", methods=["GET"])
@admin_required()
def get_all_users():
    users = services.fetch_all_users()
    return (
        jsonify(
            {"message": "Users fetched successfully", "data": users_schema.dump(users)}
        ),
        200,
    )


@users_bp.route("/addresses", methods=["POST"])
@jwt_required()
def add_user_address():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    address_data = json_data.get("value", {})
    if not address_data:
        return jsonify({"message": "Invalid input format"}), 400

    address = services.add_address_for_user(user.id, address_data)

    return (
        jsonify(
            {
                "message": "Address added successfully",
                "data": user_address_schema.dump(address),
            }
        ),
        200,
    )


@users_bp.route("/addresses/<int:address_id>", methods=["GET"])
@jwt_required()
def get_user_address(address_id):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    address = services.fetch_user_address(user.id, address_id)
    if not address:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return (
        jsonify(
            {
                "message": "Address fetched successfully",
                "data": user_address_schema.dump(address),
            }
        ),
        200,
    )
