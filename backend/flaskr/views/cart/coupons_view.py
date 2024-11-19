from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.services.cart.coupons_service import validate_coupon_and_calculate_discount


@app.route(f"{PREFIX}/coupons/apply", methods=["POST"])
@jwt_required()
def apply_coupons():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    result = validate_coupon_and_calculate_discount(json_data)
    if "error" in result:
        return jsonify({"message": result["error"]}), 400

    return jsonify({"discountAmount": result["discountAmount"]}), 200
