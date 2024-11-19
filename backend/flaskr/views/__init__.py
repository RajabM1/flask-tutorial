from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

PREFIX = "/api/v1"
