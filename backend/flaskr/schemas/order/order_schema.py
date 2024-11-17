from flaskr import ma
from flaskr.models.order.order import Order
from flaskr.schemas import fields, OneOf
from flaskr.enum.OrderStatus import OrderStatus


class OrderSchema(ma.SQLAlchemyAutoSchema):
    user_id = fields.Int(required=True, data_key="userId")
    order_address_id = fields.Int(required=True, data_key="addressId")

    total = fields.Float(required=True)
    status = fields.Str(
        required=True,
        validate=OneOf([status.name for status in OrderStatus]),
    )

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = Order
        load_instance = True
