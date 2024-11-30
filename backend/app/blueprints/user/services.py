from app.extensions import db
from app.blueprints.user.models import User, UserAddress
from app.blueprints.user.schemas import UserAddressSchema

user_address_schema = UserAddressSchema()


def fetch_all_users():
    return User.query.all()


def add_address_for_user(user_id, address_data):
    transformed_data = {
        "userId": user_id,
        "name": address_data.get("name"),
        "phone": address_data.get("phone"),
        "line1": address_data["address"].get("line1"),
        "line2": address_data["address"].get("line2"),
        "city": address_data["address"].get("city"),
        "state": address_data["address"].get("state"),
        "postalCode": address_data["address"].get("postal_code"),
        "country": address_data["address"].get("country"),
    }

    user_address = user_address_schema.load(transformed_data)

    db.session.add(user_address)
    db.session.commit()
    return user_address


def fetch_user_address(user_id, address_id):
    return UserAddress.query.filter_by(id=address_id, user_id=user_id).first()
