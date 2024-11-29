from app.extensions import ma
from app.blueprints.user.models import User, UserAddress
from app.blueprints.user.enums import UserRole, AccountStatus

from marshmallow import fields
from marshmallow.validate import Length, OneOf


class UserSchema(ma.SQLAlchemyAutoSchema):
    first_name = fields.Str(
        required=False, validate=Length(min=2, max=10), data_key="firstName"
    )
    last_name = fields.Str(
        required=False, validate=Length(min=2, max=10), data_key="lastName"
    )
    phone_number = fields.Str(
        required=False, validate=Length(max=15), data_key="phoneNumber"
    )
    date_of_birth = fields.Date(required=False, data_key="dateOfBirth")
    role = fields.Str(
        required=False,
        validate=OneOf([role.name for role in UserRole]),
        data_key="userRole",
    )
    account_status = fields.Str(
        required=False,
        validate=OneOf([status.name for status in AccountStatus]),
        data_key="accountStatus",
    )

    last_login_at = fields.DateTime(required=False, data_key="lastLoginAt")
    email_verified_at = fields.DateTime(required=False, data_key="emailVerifiedAt")
    phone_verified_at = fields.DateTime(required=False, data_key="phoneVerifiedAt")

    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    class Meta:
        model = User
        load_instance = True


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
