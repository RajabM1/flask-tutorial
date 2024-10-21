from flaskr import db


class UserItem(db.Model):
    __tablename__ = "item_owner"
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
