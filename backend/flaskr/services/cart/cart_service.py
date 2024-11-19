from flaskr import db
from flaskr.models.cart.cart import Cart


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
