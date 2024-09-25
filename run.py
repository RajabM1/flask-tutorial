from flaskr import app, db
from flaskr.models.item import Item
from flaskr.models.user import User
from flaskr.models.jwt import TokenBlacklist
from flaskr.seed import seed_items

with app.app_context():
    db.create_all()
    if not Item.query.first():
        seed_items(app)

if __name__ == "__main__":
    app.run(debug=True)
