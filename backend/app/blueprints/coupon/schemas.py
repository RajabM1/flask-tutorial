from app.extensions import ma
from app.blueprints.coupon.models import Coupons
from app.blueprints.coupon.enums import DiscountType
from marshmallow import fields
from marshmallow.validate import OneOf


class CouponsSchema(ma.SQLAlchemyAutoSchema):
    id = fields.Int(required=True, data_key="couponId")

    code = fields.Str(required=True)
    discount_type = fields.Str(
        required=True,
        data_key="discountType",
        validate=OneOf([types.name for types in DiscountType]),
    )
    discount_value = fields.Float(required=True, data_key="discountValue")
    minimum_purchase = fields.Float(data_key="minimumPurchase")
    max_use = fields.Int(data_key="maxUse")
    expires_at = fields.DateTime(required=True, data_key="expiresAt")
    is_active = fields.Boolean(required=True, data_key="isActive")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = Coupons
        load_instance = True
