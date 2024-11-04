from flaskr import db
from sqlalchemy import Enum, func
from ...enum.ItemStatus import ItemStatus


class Item(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    discount_id = db.Column(
        db.Integer, db.ForeignKey("item_discount.id"), nullable=True
    )

    name = db.Column(db.String(length=30), nullable=False, unique=True)
    price = db.Column(db.Float(), nullable=False)
    barcode = db.Column(db.String(length=12), nullable=False)
    description = db.Column(db.String(length=1024), nullable=False)
    image = db.Column(db.String(), nullable=False)
    quantity = db.Column(db.Integer(), nullable=False)
    discount = db.Column(db.Float(), nullable=True)
    status = db.Column(db.Enum(ItemStatus), nullable=False, default=ItemStatus.ACTIVE)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
