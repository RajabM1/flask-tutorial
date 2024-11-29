from flask import Blueprint
from app.config import Config

users_bp = Blueprint("users", __name__, url_prefix=f"{Config.PREFIX}/users")
