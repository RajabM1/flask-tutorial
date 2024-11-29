from flask import Blueprint
from app.config import Config

category_bp = Blueprint("category", __name__, url_prefix=f"{Config.PREFIX}/categories")
