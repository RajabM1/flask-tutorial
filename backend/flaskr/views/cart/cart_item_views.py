from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.schemas.cart.cart_item_schema import CartItemSchema
from flaskr.utils.jwt_helpers import get_current_user
from flaskr.services.cart.cart_items_service import (
    add_item_to_cart,
    update_item_quantity_in_cart,
    delete_item_from_cart,
)

cart_item_schema = CartItemSchema()


@app.route(f"{PREFIX}/cart/items", methods=["POST"])
@jwt_required()
def add_cart_item():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart_item = add_item_to_cart(user.id, json_data)
    return jsonify(cart_item_schema.dump(cart_item)), 201


@app.route(f"{PREFIX}/cart/items", methods=["PATCH"])
@jwt_required()
def update_item_quantity():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart_item = update_item_quantity_in_cart(user.id, json_data)
    if not cart_item:
        return jsonify({"message": "Something went wrong, Please try again"}), 404

    return jsonify(cart_item_schema.dump(cart_item)), 201


@app.route(f"{PREFIX}/cart/items/<int:item_id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(item_id):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    success = delete_item_from_cart(user.id, item_id)
    if not success:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    return jsonify({"message": "Item deleted successfully"}), 200
