from app.blueprints.coupon import coupon_bp
from app.blueprints.coupon import services
from app.blueprints.coupon.schemas import CouponsSchema
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from app.decorators import admin_required

coupon_schema = CouponsSchema()


@coupon_bp.route("", methods=["POST"])
@admin_required()
def create_coupon():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_coupon = services.create_new_coupon(json_data)
    return (
        jsonify(
            {
                "message": "Coupon created successfully",
                "data": coupon_schema.dump(new_coupon),
            }
        ),
        201,
    )


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
