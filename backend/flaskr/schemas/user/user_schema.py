from flaskr import ma
from flaskr.models.user.user import User
from flaskr.schemas import fields, Length, OneOf
from flaskr.enum.AccountStatus import AccountStatus
from flaskr.enum.UserRole import UserRole


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
