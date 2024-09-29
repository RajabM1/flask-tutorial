from flaskr import ma
from flaskr.models.user import User
from . import *


class AuthSchema(ma.SQLAlchemyAutoSchema):
    username = fields.Str(required=True, validate=Length(min=2, max=30))
    email = fields.Email(required=True)
    password_hash = fields.Str(required=True, validate=Length(min=6, max=60))
    budget = fields.Integer(required=False, validate=Range(min=0))

    @validates("username")
    def validates_username(self, username):
        if User.query.filter(User.username == username).first():
            raise ValidationError("Name already exists! Please try a different Name")

    @validates("email")
    def validates_email(self, email):
        if User.query.filter(User.email == email).first():
            raise ValidationError("Email already exists! Please try a different Email")

    class Meta:
        model = User
        load_instance = True
