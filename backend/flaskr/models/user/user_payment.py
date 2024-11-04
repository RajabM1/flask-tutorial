from sqlalchemy import func
from flaskr import db


class UserPayment(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)

    payment_type = db.Column(db.String(), nullable=False)
    account_number = db.Column(db.String(), nullable=False, unique=True)
    expiry_date = db.Column(db.String(length=5), nullable=False)

    is_default = db.Column(db.Boolean, nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
