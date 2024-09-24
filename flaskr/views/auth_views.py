from flask import jsonify, request
from flaskr import app, db, SQLAlchemyError
from flaskr.models.user import User
from flaskr.schemas.auth_schema import AuthSchema
from flaskr.views import PREFIX, ValidationError

auth_schema = AuthSchema()


@app.route(f"{PREFIX}/register", methods=["POST"])
def register():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    try:
        new_user = auth_schema.load(json_data)
        new_user.password = json_data["password_hash"]
    except ValidationError as err:
        return jsonify(err.messages), 400
    except SQLAlchemyError as err:
        return jsonify(err._message), 500
    db.session.add(new_user)
    db.session.commit()
    return jsonify(auth_schema.dump(new_user)), 201
