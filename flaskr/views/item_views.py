from flaskr import app, db
from . import PREFIX, ValidationError, SQLAlchemyError, jwt_required, jsonify, request
from ..models.item import Item
from ..schemas.item_schema import ItemSchema
from flaskr.decorators import admin_required

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)


@app.route(f"{PREFIX}/item", methods=["GET"])
@jwt_required()
def list_all_available_items():
    try:
        items = Item.query.filter_by(owner=None)
    except SQLAlchemyError as err:
        return jsonify({"message": str(err)}), 500
    return jsonify(items_schema.dump(items)), 200


@app.route(f"{PREFIX}/item/<int:id>", methods=["GET"])
@jwt_required()
def get_item(id):
    try:
        item = Item.query.get(id)
        if not item:
            return jsonify({"message": "Item not found"}), 404
    except SQLAlchemyError as err:
        return jsonify(err._message), 500
    return jsonify(item_schema.dump(item)), 200


@app.route(f"{PREFIX}/item", methods=["POST"])
@jwt_required()
@admin_required()
def create_item():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    try:
        new_item = item_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    except SQLAlchemyError as err:
        return jsonify(err._message), 500

    db.session.add(new_item)
    db.session.commit()
    return jsonify(item_schema.dump(new_item)), 201


@app.route(f"{PREFIX}/item/<int:id>", methods=["DELETE"])
@jwt_required()
@admin_required()
def delete_item(id):
    try:
        item = Item.query.get(id)
        if not item:
            return jsonify({"message": "Item not found"}), 404
    except SQLAlchemyError as err:
        return jsonify(err._message), 500
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
