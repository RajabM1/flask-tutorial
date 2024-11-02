from flaskr import db


class Category(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(length=30), nullable=False, unique=True)
    image = db.Column(db.String(), nullable=False)

    items = db.relationship("Item", backref="category", lazy=True)
