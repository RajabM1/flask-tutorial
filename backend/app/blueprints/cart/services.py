from app.extensions import db
from app.blueprints.cart.models import Cart, CartItem
from app.blueprints.cart.schemas import CartItemSchema


cart_item_schema = CartItemSchema()


def get_user_cart(user_id):
    cart = Cart.query.filter_by(user_id=user_id).first()
    return cart if cart else None


def delete_user_cart(user_id):
    cart = get_user_cart(user_id)
    if not cart:
        return False
    db.session.delete(cart)
    db.session.commit()
    return True


def add_item_to_cart(user_id, json_data):
    user_cart = get_user_cart(user_id)

    if not user_cart:
        user_cart = Cart(user_id=user_id)
        db.session.add(user_cart)
        db.session.flush()

    json_data["cartId"] = user_cart.id

    cart_item = get_user_cart_item(json_data["itemId"], json_data["cartId"])

    if cart_item:
        cart_item.quantity += json_data["quantity"]
    else:
        new_item = cart_item_schema.load(json_data)
        db.session.add(new_item)

    db.session.commit()
    return cart_item


def update_item_quantity_in_cart(user_id, json_data):
    user_cart = get_user_cart(user_id)
    if not user_cart:
        return None

    cart_item = get_user_cart_item(json_data["itemId"], user_cart.id)
    if not cart_item:
        return None

    cart_item.quantity = max(1, json_data["quantity"])
    db.session.commit()
    return cart_item


def delete_item_from_cart(user_id, item_id):
    user_cart = get_user_cart(user_id)
    if not user_cart:
        return None

    item_to_delete = get_user_cart_item(item_id, user_cart.id)
    if not item_to_delete:
        return None

    db.session.delete(item_to_delete)
    db.session.commit()
    return True


def get_user_cart_item(item_id, cart_id):
    cart_item = CartItem.query.filter_by(item_id=item_id, cart_id=cart_id).first()
    return cart_item if cart_item else None
