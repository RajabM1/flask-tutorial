from . import FlaskForm, SubmitField


class PurchaseForm(FlaskForm):
    submit = SubmitField(label="Purchase Item!")


class SellForm(FlaskForm):
    submit = SubmitField(label="Sell Item!")
