from flaskr import ma
from flaskr.models.user.user_address import UserAddress
from flaskr.schemas import fields, Length, validates, ValidationError


class UserAddressSchema(ma.SQLAlchemyAutoSchema):
    user_id = fields.Int(required=True, data_key="userId")
    name = fields.Str(required=True, validate=Length(max=100))
    phone = fields.Str(required=True, validate=Length(max=20))
    address_line_1 = fields.Str(
        required=True, data_key="line1", validate=Length(max=255)
    )
    address_line_2 = fields.Str(
        required=False, data_key="line2", validate=Length(max=255)
    )
    city = fields.Str(required=True, validate=Length(max=50))
    state = fields.Str(required=False, validate=Length(max=50))
    postal_code = fields.Str(
        required=True, data_key="postalCode", validate=Length(max=20)
    )
    country = fields.Str(required=True, validate=Length(max=50))

    is_default = fields.Boolean(required=False, data_key="isDefault", default=False)

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = UserAddress
        load_instance = True
