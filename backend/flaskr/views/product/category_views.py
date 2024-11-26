from flaskr import app
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.schemas.product.category_schema import CategorySchema
from flaskr.decorators import admin_required
from flaskr.services.product.category_service import (
    get_all_available_categories,
    create_new_category,
)

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@app.route(f"{PREFIX}/categories", methods=["GET"])
@jwt_required()
def get_all_categories():
    categories = get_all_available_categories()
    return jsonify({"data": categories_schema.dump(categories)}), 200


@app.route(f"{PREFIX}/categories", methods=["POST"])
@admin_required()
def create_category():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_category = create_new_category(json_data)
    return jsonify(category_schema.dump(new_category)), 201
