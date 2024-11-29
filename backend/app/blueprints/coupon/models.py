from app.extensions import db
from sqlalchemy import func
from app.blueprints.coupon.enums import DiscountType


class Coupons(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    code = db.Column(db.String(length=50), nullable=False, unique=True)
    discount_type = db.Column(db.Enum(DiscountType), nullable=False)
    discount_value = db.Column(db.Float(), nullable=False)
    minimum_purchase = db.Column(db.Float(), nullable=True, default=0.0)
    max_use = db.Column(db.Integer(), default=0)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
