from flaskr import app, db
from flaskr.models.item import Item
from flaskr.models.user import User
from flaskr.models.jwt import TokenBlacklist

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
