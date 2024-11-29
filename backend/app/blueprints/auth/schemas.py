from app.extensions import ma
from app.blueprints.user.models import User
from marshmallow import fields, ValidationError, validates
from marshmallow.validate import Length


class AuthSchema(ma.SQLAlchemyAutoSchema):
    username = fields.Str(required=True, validate=Length(min=2, max=30))
    email = fields.Email(required=True)
    password_hash = fields.Str(
        required=True,
        validate=Length(min=6, max=128),
        data_key="password",
        load_only=True,
    )

    @validates("username")
    def validate_username(self, username):
        if User.query.filter(User.username == username).first():
            raise ValidationError("Name already exists! Please try a different Name")

    @validates("email")
    def validate_email(self, email):
        if User.query.filter(User.email == email).first():
            raise ValidationError("Email already exists! Please try a different Email")

    class Meta:
        model = User
        load_instance = True
