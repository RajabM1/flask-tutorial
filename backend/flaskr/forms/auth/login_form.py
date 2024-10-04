from .. import FlaskForm, DataRequired, StringField, PasswordField, SubmitField


class LoginForm(FlaskForm):
    username = StringField(label="User Name", validators=[DataRequired()])
    password = PasswordField(label="Password", validators=[DataRequired()])
    submit = SubmitField(label="Sign In")
