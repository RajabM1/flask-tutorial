from flaskr import app
from . import PREFIX, jwt_required, jsonify
from ..models.user import User
from ..schemas.auth_schema import AuthSchema
from flaskr.decorators import admin_required

user_schema = AuthSchema()
users_schema = AuthSchema(many=True)


@app.route(f"{PREFIX}/users", methods=["GET"])
@jwt_required()
@admin_required()
def get_all_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200
