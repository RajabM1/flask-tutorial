from flaskr import ma
from flaskr.models.user import User
from flaskr.schemas import fields, Length, validates_schema, ValidationError


class AuthSchema(ma.SQLAlchemyAutoSchema):
    username = fields.Str(required=True, valdiate=Length(min=2, max=30))
    email = fields.Str(required=True, valdiate=Length(min=5, max=60))
    password_hash = fields.Str(required=True, valdiate=Length(min=6, max=60))
    budget = fields.Integer(required=False)

    @validates_schema
    def validate_username(self, data, **kwargs):
        username_to_validate = data.get("username")
        if User.query.filter_by(username=username_to_validate).first():
            raise ValidationError("Name already exists! Please try a different Name")

    @validates_schema
    def validate_email(self, data, **kwargs):
        email_to_validate = data.get("email")
        if User.query.filter_by(email=email_to_validate).first():
            raise ValidationError("Email already exists! Please try a different Email")

    class Meta:
        model = User
        load_instance = True
