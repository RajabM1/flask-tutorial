import uuid
from flaskr.enum.OrderStatus import OrderStatus
from flaskr import db
from sqlalchemy import func


class Order(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)
    order_address_id = db.Column(
        db.Integer(), db.ForeignKey("user_address.id"), nullable=False
    )

    tracking_code = db.Column(db.String(50), unique=True, nullable=True)
    total = db.Column(db.Float(), nullable=False)
    status = db.Column(
        db.Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING
    )

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    order_items = db.relationship(
        "OrderItem", backref="order", lazy=True, cascade="all, delete-orphan"
    )

    from ..order.order_item import OrderItem
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.tracking_code: 
            self.tracking_code = self.generate_tracking_code()


    def generate_tracking_code(self):
        return f"{uuid.uuid4().hex[:10].upper()}"
