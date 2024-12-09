from app.extensions import ma
from marshmallow import fields


class PaymentIntentSchema(ma.SQLAlchemyAutoSchema):
    amount = fields.Int(required=True, validate=lambda x: x > 0)
    currency = fields.Str(required=True)
    payment_intent_id = fields.Str(required=False, data_key="paymentIntentId")
