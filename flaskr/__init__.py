from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
app.config["SECRET_KEY"] = "4a90e28d582d5cce03ec50a5"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


from flaskr import routes


