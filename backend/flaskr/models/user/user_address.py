from flaskr import db
from sqlalchemy import func


class UserAddress(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)

    name = db.Column(db.String(length=100), nullable=False)
    phone = db.Column(db.String(length=20), nullable=False)
    address_line_1 = db.Column(db.String(length=255), nullable=False)
    address_line_2 = db.Column(db.String(length=255), nullable=True)
    city = db.Column(db.String(length=50), nullable=False)
    state = db.Column(db.String(length=50), nullable=False)
    postal_code = db.Column(db.String(length=20), nullable=False)
    country = db.Column(db.String(length=50), nullable=False)

    is_default = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
