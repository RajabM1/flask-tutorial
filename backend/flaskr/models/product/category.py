from flaskr import db
from sqlalchemy import func


class Category(db.Model):
    id = db.Column(db.Integer(), primary_key=True)

    name = db.Column(db.String(length=30), nullable=False, unique=True)
    image = db.Column(db.String(), nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    items = db.relationship("Item", backref="item_category", lazy=True)
