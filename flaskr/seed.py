from flaskr import db
from flaskr.models.item import Item


def seed_items(app):
    with app.app_context():
        item1 = Item(
            name="IPhone 10",
            price=500,
            barcode="893212299897",
            description="This is Phone",
        )
        item2 = Item(
            name="Laptop",
            price=900,
            barcode="123985473165",
            description="This is Laptop",
        )
        item3 = Item(
            name="Keyboard",
            price=20.5,
            barcode="231985128446",
            description="This is Keyboard",
        )

        db.session.add_all([item1, item2, item3])
        db.session.commit()

        items = Item.query.all()
        for item in items:
            print(
                f"Item Name: {item.name}, Price: {item.price}, Barcode: {item.barcode}, Description: {item.description}"
            )
