from flaskr import db
from flaskr.models.product.category import Category
from flaskr.schemas.product.category_schema import CategorySchema

category_schema = CategorySchema()


def get_all_available_categories():
    categories = Category.query.all()
    return categories


def create_new_category(json_data):
    new_category = category_schema.load(json_data)
    db.session.add(new_category)
    db.session.commit()
    return new_category
