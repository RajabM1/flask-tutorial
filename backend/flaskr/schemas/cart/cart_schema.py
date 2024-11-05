from flaskr import ma
from flaskr.models.cart.cart import Cart
from flaskr.schemas import fields, validates, ValidationError


class CartSchema(ma.SQLAlchemyAutoSchema):
    user_id = fields.Int(required=True, data_key="userId")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("user_id")
    def validate_user_id(self, user_id):
        if Cart.query.filter(Cart.user_id == user_id).first():
            raise ValidationError("Id already exist")

    class Meta:
        model = Cart
        load_instance = True
