from flaskr import ma
from flaskr.models.user.user_payment import UserPayment
from flaskr.schemas import fields, Length


class UserPaymentSchema(ma.SQLAlchemyAutoSchema):
    payment_type = fields.Str(
        required=True, data_key="paymentType", validate=Length(max=20)
    )
    account_number = fields.Str(
        required=True, data_key="accountNumber", validate=Length(max=20)
    )
    expiry_date = fields.Str(
        required=True,
        data_key="expiryDate",
        validate=Length(equal=5),
    )
    is_default = fields.Boolean(required=True, data_key="isDefault")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = UserPayment
        load_instance = True
