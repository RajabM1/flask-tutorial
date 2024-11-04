from flaskr import db
from sqlalchemy import func


class UserAddress(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)

    title = db.Column(db.String(length=10), nullable=False, unique=True)
    country = db.Column(db.String(length=50), nullable=False)
    city = db.Column(db.String(length=50), nullable=False)
    state = db.Column(db.String(length=50), nullable=True)
    postal_code = db.Column(db.String(length=10), nullable=False)
    address_line_1 = db.Column(db.String(length=100), nullable=False)
    address_line_2 = db.Column(db.String(length=100), nullable=True)

    is_default = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
