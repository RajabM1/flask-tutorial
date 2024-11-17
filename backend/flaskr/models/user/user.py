from flaskr import db, bcrypt, login_manager
from ...enum.UserRole import UserRole
from ...enum.AccountStatus import AccountStatus
from flask_login import UserMixin
from sqlalchemy import func


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    first_name = db.Column(db.String(length=10), nullable=True)
    last_name = db.Column(db.String(length=10), nullable=True)
    email = db.Column(db.String(length=60), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=128), nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.CUSTOMER)
    phone_number = db.Column(db.String(length=15), nullable=True)
    date_of_birth = db.Column(db.DateTime, nullable=True)

    account_status = db.Column(db.Enum(AccountStatus), default=AccountStatus.ACTIVE)
    last_login_at = db.Column(db.DateTime, nullable=True)

    email_verified_at = db.Column(db.DateTime, nullable=True)
    phone_verified_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    addresses = db.relationship(
        "UserAddress", backref="user", lazy=True, cascade="all, delete-orphan"
    )

    from .user_address import UserAddress

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode(
            "utf-8"
        )

    def check_password(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)
