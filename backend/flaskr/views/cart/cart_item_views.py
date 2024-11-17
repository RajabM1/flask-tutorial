from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.cart.cart import Cart
from flaskr.models.cart.cart_item import CartItem
from flaskr.schemas.cart.cart_item_schema import CartItemSchema
from flaskr.utils.jwt_helpers import get_current_user

cart_item_schema = CartItemSchema()


@app.route(f"{PREFIX}/cart/item/add", methods=["POST"])
@jwt_required()
def add_cart_item():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    user_cart = Cart.query.filter_by(user_id=user.id).first()

    if not user_cart:
        user_cart = Cart(user_id=user.id)
        db.session.add(user_cart)
        db.session.flush()

    json_data["cartId"] = user_cart.id

    item = CartItem.query.filter_by(
        item_id=json_data["itemId"], cart_id=json_data["cartId"]
    ).first()
    if item:
        item.quantity += json_data["quantity"]
    else:
        new_item = cart_item_schema.load(json_data)
        db.session.add(new_item)
        db.session.commit()
        return jsonify(cart_item_schema.dump(new_item)), 201

    db.session.commit()
    return jsonify(cart_item_schema.dump(item)), 201


@app.route(f"{PREFIX}/cart/item", methods=["PATCH"])
@jwt_required()
def update_item_quantity():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    user_cart = Cart.query.filter_by(user_id=user.id).first()
    if not user_cart:
        return jsonify({"message": "Cart not found"}), 404

    item = CartItem.query.filter_by(
        item_id=json_data["itemId"], cart_id=user_cart.id
    ).first()

    if not item:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    item.quantity = max(1, json_data["quantity"])
    db.session.commit()
    return jsonify(cart_item_schema.dump(item)), 201


@app.route(f"{PREFIX}/cart/item/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(id):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    user_cart = Cart.query.filter_by(user_id=user.id).first()
    if not user_cart:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    item_to_delete = CartItem.query.filter_by(item_id=id, cart_id=user_cart.id).first()
    if not item_to_delete:
        return jsonify({"message": "Item not found in cart"}), 404

    db.session.delete(item_to_delete)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
