from flask import Blueprint
from app.config import Config

product_bp = Blueprint("product", __name__, url_prefix=f"{Config.PREFIX}/items")

from app.blueprints.product import views
