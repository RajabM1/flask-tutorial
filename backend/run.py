from flaskr import app, db

from flaskr.models.product.item import Item
from flaskr.models.product.category import Category
from flaskr.models.product.item_discount import ItemDiscount

from flaskr.models.user.user import User
from flaskr.models.user.user_address import UserAddress
from flaskr.models.user.user_payment import UserPayment

from flaskr.models.cart.cart import Cart
from flaskr.models.cart.cart_item import CartItem

from flaskr.models.auth.jwt import TokenBlacklist

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
