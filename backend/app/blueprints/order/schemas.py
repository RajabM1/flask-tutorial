from app.extensions import ma
from app.blueprints.order.models import Order, OrderItem
from app.blueprints.order.enums import OrderStatus
from marshmallow import fields
from marshmallow.validate import Range, OneOf


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


class OrderItemSchema(ma.SQLAlchemyAutoSchema):
    order_id = fields.Int(required=True, data_key="orderId")
    item_id = fields.Int(required=True, data_key="itemId")

    quantity = fields.Int(required=True, validate=Range(min=1))
    price = fields.Float(required=True, validate=Range(min=1))

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    class Meta:
        model = OrderItem
        load_instance = True
