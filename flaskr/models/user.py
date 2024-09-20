from flaskr import db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email = db.Column(db.String(length=60), nullable=False, unique=True, default=500)
    password = db.Column(db.String(length=60), nullable=False)
    budget = db.Column(db.Integer(), nullable=True)
    items = db.relationship("Item", backref="owned_user", lazy=True)
