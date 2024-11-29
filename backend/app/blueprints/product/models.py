from app.extensions import db
from sqlalchemy import func
from app.blueprints.product.enums import ItemStatus


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
