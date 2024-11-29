from flask import Blueprint
from app.config import Config

order_bp = Blueprint("order", __name__, url_prefix=f"{Config.PREFIX}/order")

from app.blueprints.order import views
