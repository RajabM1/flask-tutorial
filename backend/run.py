from flaskr import app, db

from flaskr.models.product.item import Item
from flaskr.models.product.category import Category
from flaskr.models.product.item_discount import ItemDiscount
from flaskr.models.user.user import User
from flaskr.models.user.user_address import UserAddress
from flaskr.models.cart.cart import Cart
from flaskr.models.cart.cart_item import CartItem
from flaskr.models.order.order import Order
from flaskr.models.order.order_item import OrderItem
from flaskr.models.auth.jwt import TokenBlacklist

from flaskr.views.user import user_views, user_address_views
from flaskr.views.product import category_views, item_views
from flaskr.views.cart import cart_item_views, cart_views
from flaskr.views.auth import auth_views
from flaskr.views.stripe import stripe_view
from flaskr.views.order import order_view

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
