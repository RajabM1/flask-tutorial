from app.blueprints.coupon.models import Coupons
from app.blueprints.coupon.enums import DiscountType


def validate_coupon_and_calculate_discount(json_data):
    coupon = Coupons.query.filter_by(code=json_data["couponCode"]).first()

    if not coupon or not coupon.is_active:
        return {"error": "Invalid or expired coupon."}

    if json_data["cartTotal"] < coupon.minimum_purchase:
        return {"error": "Minimum purchase not met."}

    discount = 0
    if coupon.discount_type == DiscountType.PERCENTAGE:
        discount = (coupon.discount_value / 100) * json_data["cartTotal"]
    elif coupon.discount_type == DiscountType.FIXED:
        discount = coupon.discount_value

    return {"discountAmount": discount}
