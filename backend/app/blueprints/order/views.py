from app.blueprints.order import order_bp
from app.blueprints.order.schemas import OrderSchema
from app.blueprints.order import services
from app.blueprints.product.schemas import ItemSchema
from app.utils.auth_helpers import get_current_user
from flask import jsonify, request
from flask_jwt_extended import jwt_required

order_schema = OrderSchema()
items_schema = ItemSchema(many=True)


@order_bp.route("", methods=["POST"])
@jwt_required()
def create_order():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order_result = services.process_order(user.id, json_data["addressId"])
    if isinstance(order_result, dict):
        return jsonify({"message": order_result["error"]}), 400

    return (
        jsonify(
            {
                "message": "Order created successfully",
                "data": order_schema.dump(order_result),
            }
        ),
        201,
    )


@order_bp.route("/<string:order_code>", methods=["GET"])
@jwt_required()
def get_order_items(order_code):
    user = get_current_user()
    if not user:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    order = services.get_order(user.id, order_code)
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
    return (
        jsonify(
            {
                "message": "Order items retrieved successfully",
                "data": items_schema.dump(order_items_data),
            }
        ),
        200,
    )
