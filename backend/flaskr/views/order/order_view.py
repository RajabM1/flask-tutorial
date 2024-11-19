from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.schemas.order.order_schema import OrderSchema
from flaskr.utils.jwt_helpers import get_current_user
from flaskr.services.order.order_service import process_order

order_schema = OrderSchema()


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
