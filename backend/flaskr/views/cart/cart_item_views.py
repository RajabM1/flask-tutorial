from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request, get_jwt_identity
from flaskr.models.cart.cart import Cart
from flaskr.models.user.user import User
from flaskr.models.cart.cart_item import CartItem
from flaskr.schemas.cart.cart_item_schema import CartItemSchema

cart_item_schema = CartItemSchema()


@app.route(f"{PREFIX}/cart/item/add", methods=["POST"])
@jwt_required()
def add_cart_item():
    json_data = request.get_json()
    identity = get_jwt_identity()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = User.query.filter_by(username=identity).first()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    user_cart = Cart.query.filter_by(user_id=user.id).first()

    if not user_cart:
        new_cart = Cart(user_id=user.id)
        db.session.add(new_cart)
        db.session.flush()
        json_data["cartId"] = new_cart.id
    else:
        json_data["cartId"] = user_cart.id

    new_item = cart_item_schema.load(json_data)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(cart_item_schema.dump(new_item)), 201


@app.route(f"{PREFIX}/cart/item/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_cart_item(id):
    identity = get_jwt_identity()
    user = User.query.filter_by(username=identity).first()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart = Cart.query.filter_by(user_id=user.id).first()
    item_to_delete = CartItem.query.filter_by(item_id=id, cart_id=cart.id).first()

    if not item_to_delete:
        return jsonify({"message": "Item not found in cart"}), 404

    db.session.delete(item_to_delete)
    db.session.commit()

    return jsonify({"message": "Item deleted successfully"}), 200
