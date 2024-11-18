from flaskr import db
from sqlalchemy import func


class CartItem(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    cart_id = db.Column(db.Integer(), db.ForeignKey("cart.id"), nullable=False)
    item_id = db.Column(db.Integer(), db.ForeignKey("item.id"), nullable=False)

    quantity = db.Column(db.Integer(), nullable=False)
    price = db.Column(db.Float(), nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    item = db.relationship("Item", backref="cart_items", lazy=True)