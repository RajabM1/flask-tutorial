from app.extensions import ma
from app.blueprints.cart.models import Cart, CartItem
from marshmallow import fields, ValidationError, validates
from marshmallow.validate import Range


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


class CartItemSchema(ma.SQLAlchemyAutoSchema):
    cart_id = fields.Int(required=True, data_key="cartId")
    item_id = fields.Int(required=True, data_key="itemId")

    quantity = fields.Int(required=True, validate=Range(min=1))
    price = fields.Float(required=True, validate=Range(min=1))

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = CartItem
        load_instance = True
