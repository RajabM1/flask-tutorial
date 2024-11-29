from flask import Blueprint
from app.config import Config

coupon_bp = Blueprint("coupon", __name__, url_prefix=f"{Config.PREFIX}/coupons")

from app.blueprints.coupon import views
