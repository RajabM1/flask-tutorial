from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Length, EqualTo, DataRequired, Email, ValidationError
from flaskr.models.user import User


class RegisterForm(FlaskForm):

    def validate_username(self, username_to_validate):
        user = User.query.filter_by(username=username_to_validate.data).first()
        if user:
            raise ValidationError(
                "User Name already exists! Please try a different User Name"
            )

    def validate_email(self, email_to_validate):
        user = User.query.filter_by(email=email_to_validate.data).first()
        if user:
            raise ValidationError(
                "Email address already exist! Please try a different Email Address"
            )

    username = StringField(
        label="User Name", validators=[Length(min=2, max=15), DataRequired()]
    )
    email = StringField(label="Email", validators=[Email(), DataRequired()])
    password1 = PasswordField(
        label="Password", validators=[Length(min=6), DataRequired()]
    )
    password2 = PasswordField(
        label="Confirm Password", validators=[EqualTo("password1"), DataRequired()]
    )
    submit = SubmitField(label="Create Account")


class LoginForm(FlaskForm):
    username = StringField(label="User Name", validators=[DataRequired()])
    password = PasswordField(label="Password", validators=[DataRequired()])
    submit = SubmitField(label="Sign In")
