from flaskr import db
from flaskr.models.item import Item
from flaskr.models.user import User


def seed_items(app):
    with app.app_context():
        user1 = User(
            username="john_doe",
            email="john@example.com",
            password_hash="hashedpassword123",
            budget=1000,
        )
        user2 = User(
            username="jane_smith",
            email="jane@example.com",
            password_hash="hashedpassword456",
            budget=1500,
        )

        db.session.add_all([user1, user2])
        db.session.commit()

        item1 = Item(
            name="IPhone 10",
            price=500,
            barcode="893212299897",
            description="This is Phone",
            owner=user1.id,
        )
        item2 = Item(
            name="Laptop",
            price=900,
            barcode="123985473165",
            description="This is Laptop",
            owner=user2.id,
        )
        item3 = Item(
            name="Keyboard",
            price=20.5,
            barcode="231985128446",
            description="This is Keyboard",
            owner=None,
        )

        db.session.add_all([item1, item2, item3])
        db.session.commit()

        items = Item.query.all()
        for item in items:
            print(
                f"Item Name: {item.name}, Price: {item.price}, Barcode: {item.barcode}, "
                f"Description: {item.description}, Owner: {item.owned_user.username if item.owned_user else 'None'}"
            )
