from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.schemas.order.order_schema import OrderSchema
from flaskr.utils.jwt_helpers import get_current_user
from flaskr.services.order.order_service import process_order
from flaskr.schemas.product.item_schema import ItemSchema
from flaskr.models.order.order import Order

order_schema = OrderSchema()
items_schema = ItemSchema(many=True)


@app.route(f"{PREFIX}/order", methods=["POST"])
@jwt_required()
def create_order():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order_result = process_order(user.id, json_data["addressId"])
    if isinstance(order_result, dict):
        return jsonify({"message": order_result["error"]}), 400

    return jsonify(order_schema.dump(order_result)), 201


@app.route(f"{PREFIX}/order/<string:order_code>", methods=["GET"])
@jwt_required()
def get_order_items(order_code):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order = get_order(user.id, order_code)
    if not order:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order_items = order.order_items

    order_items_data = [
        {
            "id": order_item.item.id,
            "name": order_item.item.name,
            "price": order_item.item.price,
            "quantity": order_item.quantity,
            "description": order_item.item.description,
            "image": order_item.item.image,
            "discount": order_item.item.discount,
            "category_id": order_item.item.category_id,
        }
        for order_item in order_items
    ]
    return jsonify({"data": items_schema.dump(order_items_data)}), 200


def get_order(user_id, order_code):
    order = Order.query.filter_by(user_id=user_id, tracking_code=order_code).first()
    return order if order else None
