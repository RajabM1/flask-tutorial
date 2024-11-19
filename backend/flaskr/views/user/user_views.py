from flaskr import app
from flaskr.views import PREFIX, jsonify
from flaskr.models.user.user import User
from flaskr.schemas.auth.auth_schema import AuthSchema
from flaskr.decorators import admin_required

users_schema = AuthSchema(many=True)


@app.route(f"{PREFIX}/users", methods=["GET"])
@admin_required()
def get_all_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200
