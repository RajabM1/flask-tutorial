from flaskr import db
from flaskr.models.product.item import Item
from flaskr.models.product.category import Category
from flaskr.schemas.product.item_schema import ItemSchema

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


def get_items_by_category_name(category_name):
    category = Category.query.filter_by(name=category_name).first()
    return category.items if category else None
