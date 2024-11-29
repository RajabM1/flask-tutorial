from app.extensions import db
from app.blueprints.category.models import Category
from app.blueprints.category.schemas import CategorySchema

category_schema = CategorySchema()


def get_items_by_category_name(category_name):
    category = Category.query.filter_by(name=category_name).first()
    return category.items if category else None


def get_all_available_categories():
    categories = Category.query.all()
    return categories


def create_new_category(json_data):
    new_category = category_schema.load(json_data)
    db.session.add(new_category)
    db.session.commit()
    return new_category
