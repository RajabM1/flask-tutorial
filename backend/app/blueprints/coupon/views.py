from app.blueprints.coupon import coupon_bp
from app.blueprints.coupon import services
from flask import jsonify, request
from flask_jwt_extended import jwt_required


@coupon_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_coupons():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    result = services.validate_coupon_and_calculate_discount(json_data)
    if "error" in result:
        return jsonify({"message": result["error"]}), 400

    return (
        jsonify(
            {
                "message": "Coupon applied successfully",
                "data": {"discountAmount": result["discountAmount"]},
            }
        ),
        200,
    )
