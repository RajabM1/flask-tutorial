from app.decorators import admin_required
from app.blueprints.category import category_bp
from app.blueprints.category.schemas import CategorySchema
from app.blueprints.category.services import (
    get_all_available_categories,
    create_new_category,
)
from flask import jsonify, request
from flask_jwt_extended import jwt_required

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@category_bp.route("", methods=["GET"])
@jwt_required()
def get_all_categories():
    categories = get_all_available_categories()
    return jsonify({"data": categories_schema.dump(categories)}), 200


@category_bp.route("", methods=["POST"])
@admin_required()
def create_category():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_category = create_new_category(json_data)
    return jsonify(category_schema.dump(new_category)), 201
