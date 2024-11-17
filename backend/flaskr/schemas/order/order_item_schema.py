from flaskr import ma
from flaskr.models.order.order_item import OrderItem
from flaskr.schemas import fields, Range


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
