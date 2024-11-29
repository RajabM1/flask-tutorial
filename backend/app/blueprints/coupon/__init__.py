from flask import Blueprint
from app.config import Config

coupons_bp = Blueprint("coupons", __name__, url_prefix=f"{Config.PREFIX}/coupons")
