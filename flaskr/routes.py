from flaskr import app, db
from flask import render_template, redirect, url_for, flash
from flaskr.models.item import Item
from flaskr.models.user import User
from flaskr.forms import RegisterForm, LoginForm
from flask_login import login_user


@app.route("/")
@app.route("/home")
def home_page():
    return render_template("home.html.jinja")


@app.route("/market")
def market_page():
    items = Item.query.all()
    return render_template("market.html.jinja", items=items)


@app.route("/users")
def users_page():
    users = User.query.all()
    return render_template("users.html.jinja", users=users)


@app.route("/register", methods=["GET", "POST"])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(
            username=form.username.data,
            email=form.email.data,
            password=form.password1.data,
        )
        db.session.add(user_to_create)
        db.session.commit()
        return redirect(url_for("users_page"))
    if form.errors != {}:
        for err_msg in form.errors.values():
            flash(f"{err_msg}", category="danger")

    return render_template("register.html.jinja", form=form)


@app.route("/login", methods=["GET", "POST"])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = User.query.filter_by(username=form.username.data).first()
        if attempted_user and attempted_user.check_password(form.password.data):
            login_user(attempted_user)
            flash(
                f"Success! You are logged in as: {attempted_user.username}",
                category="success",
            )
            return redirect(url_for("market_page"))
        else:
            flash(
                "Username and password are not match! Please try again",
                category="danger",
            )
    return render_template("login.html.jinja", form=form)
