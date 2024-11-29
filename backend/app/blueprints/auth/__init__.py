from flask import Blueprint
from app.config import Config

auth_bp = Blueprint("auth", __name__, url_prefix=f"{Config.PREFIX}/auth")
