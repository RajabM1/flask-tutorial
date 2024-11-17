from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify
from flaskr.models.cart.cart import Cart
from flaskr.models.user.user import User
from flaskr.schemas.product.item_schema import ItemSchema
from flaskr.utils.jwt_helpers import get_current_user

items_schema = ItemSchema(many=True)


@app.route(f"{PREFIX}/cart", methods=["GET"])
@jwt_required()
def get_cart_items():
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart = Cart.query.filter_by(user_id=user.id).first()
    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    cart_items = cart.cart_items

    cart_items_data = [
        {
            "id": cart_item.item.id,
            "name": cart_item.item.name,
            "price": cart_item.item.price,
            "quantity": cart_item.quantity,
            "description": cart_item.item.description,
            "image": cart_item.item.image,
            "discount": cart_item.item.discount,
            "category_id": cart_item.item.category_id,
        }
        for cart_item in cart_items
    ]
    return jsonify(items_schema.dump(cart_items_data)), 200


@app.route(f"{PREFIX}/cart", methods=["DELETE"])
@jwt_required()
def delete_cart():
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    cart = Cart.query.filter_by(user_id=user.id).first()

    db.session.delete(cart)
    db.session.commit()
    return jsonify({"message": "Cart deleted successfully"}), 200
