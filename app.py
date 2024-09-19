from flask import Flask, render_template
from models import db, Item
from init_db import item_model

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
db.init_app(app)

with app.app_context():
    db.create_all()
    if not Item.query.first():
        item_model(app)


@app.route("/")
@app.route("/home")
def home_page():
    return render_template("home.html.jinja")


@app.route("/market")
def market_page():
    items = Item.query.all()
    return render_template("market.html.jinja", items=items)
