from . import *
from flaskr.models.item import Item
from flaskr.forms import PurchaseForm, SellForm
from flask_login import login_required, current_user


@app.route("/market", methods=["GET", "POST"])
@login_required
def market_page():
    purchase_form = PurchaseForm()
    selling_form = SellForm()
    if request.method == "POST":
        if "purchased_item" in request.form:
            buy_product()
        elif "sold_item" in request.form:
            sell_product()
        else:
            flash("Something went wrong!, Please try again", category="info")
        return redirect(url_for("market_page"))

    if request.method == "GET":
        items = Item.query.filter_by(owner=None)
        owned_items = Item.query.filter_by(owner=current_user.id)
        return render_template(
            "market.html.jinja",
            items=items,
            owned_items=owned_items,
            purchase_form=purchase_form,
            selling_form=selling_form,
        )
    

def buy_product():
    purchase_item = request.form.get("purchased_item")
    purchase_item_object = Item.query.filter_by(name=purchase_item).first()
    if purchase_item_object:
        if current_user.can_buy(purchase_item_object.price):
            purchase_item_object.buy(current_user)
            flash(
                f"Congratulations! You purchased {purchase_item_object.name} for {purchase_item_object.price}$",
                category="success",
            )
        else:
            flash(
                f"Unfortunately, you don't have enough money to purchase {purchase_item_object.name}!",
                category="danger",
            )
    else:
        flash("Something went wrong!, Please try again", category="info")


def sell_product():
    item_to_sell = request.form.get("sold_item")
    item_to_sell_object = Item.query.filter_by(name=item_to_sell).first()
    if item_to_sell_object:
        if current_user.can_sell(item_to_sell_object.owner):
            item_to_sell_object.sell(current_user)
            flash(
                f"Congratulations! You sold {item_to_sell_object.name} back to market!",
                category="success",
            )
        else:
            flash(
                f"Something went wrong with selling {item_to_sell_object.name}",
                category="danger",
            )
    else:
        flash("Something went wrong!, Please try again", category="info")
