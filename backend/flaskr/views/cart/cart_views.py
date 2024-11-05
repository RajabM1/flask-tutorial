from flaskr import app, db
from flaskr.views import PREFIX, jwt_required, jsonify, request
from flaskr.models.cart.cart import Cart
from flaskr.schemas.cart.cart_schema import CartSchema

cart_schema = CartSchema()
carts_schema = CartSchema(many=True)


@app.route(f"{PREFIX}/cart", methods=["GET"])
@jwt_required()
def get_cart():
    carts = Cart.query.all()
    return jsonify(carts_schema.dump(carts)), 200


@app.route(f"{PREFIX}/cart", methods=["Post"])
@jwt_required()
def add_cart():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    new_cart = cart_schema.load(json_data)
    db.session.add(new_cart)
    db.session.commit()
    return jsonify(cart_schema.dump(new_cart)), 201
