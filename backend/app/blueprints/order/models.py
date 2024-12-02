import uuid
from sqlalchemy import func
from app.extensions import db
from app.blueprints.order.enums import OrderStatus


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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.tracking_code:
            self.tracking_code = self.generate_tracking_code()

    def generate_tracking_code(self):
        return f"{uuid.uuid4().hex[:10].upper()}"


class OrderItem(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    order_id = db.Column(db.Integer(), db.ForeignKey("order.id"), nullable=False)
    item_id = db.Column(db.Integer(), db.ForeignKey("item.id"), nullable=False)

    quantity = db.Column(db.Integer(), nullable=False)
    price = db.Column(db.Float(), nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    item = db.relationship("Item", backref="order_items", lazy=True)
