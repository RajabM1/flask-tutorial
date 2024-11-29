from app.extensions import db
from app.blueprints.order.models import OrderItem
from app.blueprints.order.schemas import OrderSchema
from app.blueprints.cart.services import get_user_cart
from app.blueprints.product.services import get_item


order_schema = OrderSchema()


def process_order(user_id, address_id):
    cart = get_user_cart(user_id)
    if not cart or not cart.cart_items:
        return {"error": "Something went wrong, Please try again"}

    new_order = order_schema.load(
        {
            "userId": user_id,
            "addressId": address_id,
            "status": "PENDING",
            "total": 0,
        }
    )

    db.session.add(new_order)
    db.session.flush()

    order_items = []
    total = 0

    for cart_item in cart.cart_items:
        item = get_item(cart_item.item_id)
        if not item:
            return {"error": "Something went wrong, Please try again."}

        if item.quantity < cart_item.quantity:
            return {"error": "Insufficient stock for item."}

        item.quantity -= cart_item.quantity

        order_item = OrderItem(
            order_id=new_order.id,
            item_id=cart_item.item_id,
            quantity=cart_item.quantity,
            price=item.discount if item.discount else item.price,
        )
        order_items.append(order_item)
        total += cart_item.quantity * (item.discount if item.discount else item.price)

    db.session.bulk_save_objects(order_items)

    new_order.total = total
    db.session.commit()
    return new_order
