from app.extensions import db
from app.blueprints.product.models import Item
from app.blueprints.product.schemas import ItemSchema


item_schema = ItemSchema()


def get_item(item_id):
    item = Item.query.get(item_id)
    return item if item else None


def get_all_available_items():
    items = Item.query.filter(Item.quantity > 0).all()
    return items if items else None


def create_new_item(json_data):
    new_item = item_schema.load(json_data)
    db.session.add(new_item)
    db.session.commit()
    return new_item
