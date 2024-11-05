from flaskr import db
from sqlalchemy import func


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer(), db.ForeignKey("user.id"), nullable=False, unique=True
    )

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    cart_items = db.relationship(
        "CartItem", backref="cart", lazy=True, cascade="all, delete-orphan"
    )

    from .cart_item import CartItem
