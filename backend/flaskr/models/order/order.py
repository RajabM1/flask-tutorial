from flaskr.enum.OrderStatus import OrderStatus
from flaskr import db
from sqlalchemy import func


class Order(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)
    order_address_id = db.Column(
        db.Integer(), db.ForeignKey("user_address.id"), nullable=False
    )

    total = db.Column(db.Float(), nullable=False)
    status = db.Column(
        db.Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING
    )

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

