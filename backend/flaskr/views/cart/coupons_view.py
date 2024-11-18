from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.cart.coupons import Coupons
from flaskr.enum.DiscountType import DiscountType


@app.route(f"{PREFIX}/coupons/apply", methods=["POST"])
@jwt_required()
def apply_coupons():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "Something went wrong, Please try again"}), 400

    coupon = Coupons.query.filter(Coupons.code == json_data["couponCode"]).first()

    if not coupon or not coupon.is_active:
        return jsonify({"message": "Invalid or expired coupon."}), 400

    if json_data["cartTotal"] < coupon.minimum_purchase:
        return jsonify({"message": "Minimum purchase not met."}), 400

    discount = 0
    if coupon.discount_type == DiscountType.PERCENTAGE:
        discount = (coupon.discount_value / 100) * json_data["cartTotal"]
    elif coupon.discount_type == DiscountType.FIXED:
        discount = coupon.discount_value

    return jsonify({"discountAmount": discount}), 200
