from .user_item import UserItem
from flaskr import db


class Item(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(length=30), nullable=False, unique=True)
    price = db.Column(db.Float(), nullable=False)
    barcode = db.Column(db.String(length=12), nullable=False)
    description = db.Column(db.String(length=1024), nullable=False)
    image = db.Column(db.String(), nullable=False)
    quantity = db.Column(db.Integer(), nullable=False)

    owners = db.relationship(
        "User", secondary=UserItem.__tablename__, backref="owned_items"
    )

    def buy(self, current_user, quantity):
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")

        if self.quantity < quantity:
            raise ValueError("Not enough stock available.")

        item_owner = UserItem.query.filter_by(
            user_id=current_user.id, item_id=self.id
        ).first()

        if item_owner:
            item_owner.quantity += quantity
        else:
            new_item_owner = UserItem(
                user_id=current_user.id, item_id=self.id, quantity=quantity
            )
            db.session.add(new_item_owner)

        current_user.budget -= quantity * self.price
        self.quantity -= quantity

        db.session.commit()
