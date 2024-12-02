from flask import Blueprint
from app.config import Config

cart_bp = Blueprint("cart", __name__, url_prefix=f"{Config.PREFIX}/cart")

from app.blueprints.cart import views
