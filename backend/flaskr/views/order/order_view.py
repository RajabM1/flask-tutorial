from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.cart.cart import Cart
from flaskr.models.product.item import Item
from flaskr.models.order.order_item import OrderItem
from flaskr.schemas.order.order_schema import OrderSchema
from flaskr.utils.jwt_helpers import get_current_user

order_schema = OrderSchema()


@app.route(f"{PREFIX}/order", methods=["POST"])
@jwt_required()
def create_order():
    json_data = request.get_json()
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    new_order = order_schema.load(
        {
            "userId": user.id,
            "addressId": json_data["addressId"],
            "status": "PENDING",
            "total": 0,
        }
    )

    db.session.add(new_order)
    db.session.flush()

    cart = Cart.query.filter_by(user_id=user.id).first()
    if not cart or not cart.cart_items:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order_items = []
    total = 0

    for cart_item in cart.cart_items:
        item = Item.query.get(cart_item.item_id)
        if not item:
            return jsonify({"message": "Something went wrong, Please try again"}), 400

        item_price = item.price

        if item.quantity >= cart_item.quantity:
            item.quantity -= cart_item.quantity
        else:
            return jsonify({"message": "Insufficient stock for item"}), 400

        order_item = OrderItem(
            order_id=new_order.id,
            item_id=cart_item.item_id,
            quantity=cart_item.quantity,
            price=item_price,
        )
        order_items.append(order_item)
        total += cart_item.quantity * item_price

    db.session.bulk_save_objects(order_items)

    new_order.total = total
    db.session.commit()

    return jsonify(order_schema.dump(new_order)), 201
