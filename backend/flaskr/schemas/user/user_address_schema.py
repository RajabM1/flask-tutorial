from flaskr import ma
from flaskr.models.user.user_address import UserAddress
from flaskr.schemas import fields, Length, validates, ValidationError


class UserAddressSchema(ma.SQLAlchemyAutoSchema):
    title = fields.Str(required=True, validate=Length(max=10))
    country = fields.Str(required=True, validate=Length(max=50))
    city = fields.Str(required=True, validate=Length(max=50))
    state = fields.Str(required=False, validate=Length(max=50))
    postal_code = fields.Str(
        required=True, data_key="postalCode", validate=Length(max=10)
    )
    address_line_1 = fields.Str(
        required=True, data_key="addressLine1", validate=Length(max=100)
    )
    address_line_2 = fields.Str(
        required=False, data_key="addressLine2", validate=Length(max=100)
    )
    is_default = fields.Boolean(required=False, data_key="isDefault")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("title")
    def validate_title(self, title):
        if UserAddress.query.filter(UserAddress.title == title).first():
            raise ValidationError("Title already exists! Please try a different Title")

    class Meta:
        model = UserAddress
        load_instance = True
