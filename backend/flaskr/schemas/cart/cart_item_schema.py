from flaskr import ma
from flaskr.models.cart.cart_item import CartItem
from flaskr.schemas import fields, Range


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
