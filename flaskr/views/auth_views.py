from flask import jsonify, request
from flaskr import app, db, SQLAlchemyError, create_access_token, create_refresh_token
from flaskr.models.user import User
from flaskr.schemas.auth_schema import AuthSchema
from flaskr.views import PREFIX, ValidationError

auth_schema = AuthSchema()


@app.route(f"{PREFIX}/auth/register", methods=["POST"])
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


@app.route(f"{PREFIX}/auth/login", methods=["POST"])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"message": "No input data provided"}), 400
    user = User.query.filter_by(username=json_data["username"]).first()
    if user:
        if user.check_password(json_data["password_hash"]):
            access_token = create_access_token(identity=json_data["username"])
            refresh_token = create_refresh_token(identity=json_data["username"])
            return (
                jsonify(
                    message="Login Successful",
                    access_token=access_token,
                    refresh_token=refresh_token,
                ),
                200,
            )

    return jsonify("Invalid email or Password"), 401
