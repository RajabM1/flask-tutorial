from flask_jwt_extended import get_jwt_identity
from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.product.item import Item
from flaskr.models.user.user import User
from flaskr.models.product.category import Category
from flaskr.schemas.product.item_schema import ItemSchema
from flaskr.decorators import admin_required

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)


@app.route(f"{PREFIX}/items", methods=["GET"])
@jwt_required()
def list_all_available_items():
    items = Item.query.filter(Item.quantity > 0).all()
    return jsonify(items_schema.dump(items)), 200


@app.route(f"{PREFIX}/items/<int:id>", methods=["GET"])
@jwt_required()
def get_item(id):
    item = Item.query.get(id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    return jsonify(item_schema.dump(item)), 200


@app.route(f"{PREFIX}/items", methods=["POST"])
@jwt_required()
@admin_required()
def create_item():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    new_item = item_schema.load(json_data)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(item_schema.dump(new_item)), 201


@app.route(f"{PREFIX}/items/<int:id>", methods=["DELETE"])
@jwt_required()
@admin_required()
def delete_item(id):
    item = Item.query.get(id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200


@app.route(f"{PREFIX}/items/<int:id>", methods=["PATCH"])
@jwt_required()
@admin_required()
def update_item(id):
    item_schema = ItemSchema(partial=True)

    item = Item.query.get(id)
    json_data = request.get_json()
    if not item:
        return jsonify({"message": "Item not found"}), 404

    if json_data:
        item = item_schema.load(json_data, instance=item)
        db.session.commit()

    return (
        jsonify(
            {"message": "Item Updated successfully", "item": item_schema.dump(item)}
        ),
        200,
    )


@app.route(f"{PREFIX}/items/<int:id>/buy", methods=["PATCH"])
@jwt_required()
def buy_item(id):
    username = get_jwt_identity()

    user = User.query.filter_by(username=username).first()
    item = Item.query.get(id)
    quantity = request.get_json()["quantity"]

    if not quantity:
        return jsonify({"message": "No input data provided"}), 400

    if not item:
        return jsonify({"message": "Item not found"}), 404

    if not user.can_buy(item.price, quantity):
        return jsonify({"message": "You don't have enough money to purchase"}), 403

    item.buy(user, quantity)

    return (
        jsonify(
            {"message": "Item purchased successfully", "item": item_schema.dump(item)}
        ),
        200,
    )


@app.route(f"{PREFIX}/items/<int:id>/sell", methods=["PATCH"])
@jwt_required()
def sell_item(id):
    username = get_jwt_identity()

    user = User.query.filter_by(username=username).first()
    item = Item.query.get(id)

    if not item:
        return jsonify({"message": "Item not found"}), 404

    if user.can_sell(user):
        return jsonify({"message": "Something went wrong please try again"}), 400

    item.sell(user)
    db.session.commit()
    return (
        jsonify(
            {"message": "Item Sealed successfully", "item": item_schema.dump(item)}
        ),
        200,
    )


@app.route(f"{PREFIX}/items/<string:category>", methods=["GET"])
@jwt_required()
def get_items_by_category(category):
    category = Category.query.filter_by(name=category).first()
    return jsonify(items_schema.dump(category.items)), 200


@app.route(f"{PREFIX}/users/me/items", methods=["GET"])
@jwt_required()
def get_user_items():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    return jsonify(items_schema.dump(user.items)), 200
