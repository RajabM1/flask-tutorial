from flaskr import app
from flask import render_template
from flaskr.models.item import Item
from flaskr.forms import RegisterForm


@app.route("/")
@app.route("/home")
def home_page():
    return render_template("home.html.jinja")


@app.route("/market")
def market_page():
    items = Item.query.all()
    return render_template("market.html.jinja", items=items)


@app.route("/register")
def register_page():
    form = RegisterForm()
    return render_template("register.html.jinja", form=form)
