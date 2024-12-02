from app.decorators import admin_required
from app.blueprints.category import category_bp
from app.blueprints.category.schemas import CategorySchema
from app.blueprints.category import services
from flask import jsonify, request
from flask_jwt_extended import jwt_required

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


@category_bp.route("", methods=["GET"])
@jwt_required()
def get_all_categories():
    categories = services.get_all_available_categories()
    return (
        jsonify(
            {
                "message": "Categories retrieved successfully",
                "data": categories_schema.dump(categories),
            }
        ),
        200,
    )


@category_bp.route("", methods=["POST"])
@admin_required()
def create_category():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    new_category = services.create_new_category(json_data)
    return (
        jsonify(
            {
                "message": "Category created successfully",
                "data": category_schema.dump(new_category),
            }
        ),
        201,
    )
