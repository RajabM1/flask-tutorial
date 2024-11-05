from flask_jwt_extended import get_jwt_identity
from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.product.category import Category
from flaskr.schemas.product.category_schema import CategorySchema
from flaskr.decorators import admin_required

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@app.route(f"{PREFIX}/categories", methods=["GET"])
@jwt_required()
def get_all_categories():
    categories = Category.query.all()
    return jsonify(categories_schema.dump(categories)), 200


@app.route(f"{PREFIX}/categories", methods=["POST"])
@jwt_required()
@admin_required()
def create_category():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    new_category = category_schema.load(json_data)
    db.session.add(new_category)
    db.session.commit()
    return jsonify(category_schema.dump(new_category)), 201
