from flaskr import db
from sqlalchemy import func


class ItemDiscount(db.Model):
    id = db.Column(db.Integer(), primary_key=True)

    name = db.Column(db.String(), nullable=False, unique=True)
    discount_percent = db.Column(db.Float(), nullable=False)
    active = db.Column(db.Boolean(), nullable=False, default=True)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    items = db.relationship(
        "Item", backref="item_discount", lazy=True, cascade="all, delete-orphan"
    )
