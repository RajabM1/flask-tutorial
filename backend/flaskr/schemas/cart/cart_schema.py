from flaskr import ma
from flaskr.models.cart.cart import Cart
from flaskr.schemas import fields


class CartSchema(ma.SQLAlchemyAutoSchema):
    user_id = fields.Int(required=True, data_key="userId")

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = Cart
        load_instance = True
