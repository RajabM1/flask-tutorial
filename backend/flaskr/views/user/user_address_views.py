from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.schemas.user.user_address_schema import UserAddressSchema
from flaskr.utils.jwt_helpers import get_current_user
from flaskr.models.user.user_address import UserAddress

user_address_schema = UserAddressSchema()


@app.route(f"{PREFIX}/users/address", methods=["POST"])
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

    transformed_data = {
        "userId": user.id,
        "name": address_data.get("name"),
        "phone": address_data.get("phone"),
        "line1": address_data["address"].get("line1"),
        "line2": address_data["address"].get("line2"),
        "city": address_data["address"].get("city"),
        "state": address_data["address"].get("state"),
        "postalCode": address_data["address"].get("postal_code"),
        "country": address_data["address"].get("country"),
        "isDefault": json_data.get("save", False),
    }

    user_address = user_address_schema.load(transformed_data)

    db.session.add(user_address)
    db.session.commit()

    return jsonify({"address": user_address_schema.dump(user_address)}), 200


@app.route(f"{PREFIX}/users/address/<int:address_id>", methods=["GET"])
@jwt_required()
def get_user_address(address_id):

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    address = UserAddress.query.filter_by(id=address_id, user_id=user.id).first()
    if not address:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return jsonify({"address": user_address_schema.dump(address)}), 200
