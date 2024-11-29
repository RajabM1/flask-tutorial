from app.blueprints.coupon import coupons_bp
from app.blueprints.coupon.services import validate_coupon_and_calculate_discount

from flask import jsonify, request
from flask_jwt_extended import jwt_required


@coupons_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_coupons():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    result = validate_coupon_and_calculate_discount(json_data)
    if "error" in result:
        return jsonify({"message": result["error"]}), 400

    return jsonify({"discountAmount": result["discountAmount"]}), 200
