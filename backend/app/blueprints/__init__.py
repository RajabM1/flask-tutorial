from app.blueprints.auth import auth_bp
from app.blueprints.user import users_bp
from app.blueprints.product import product_bp
from app.blueprints.category import category_bp
from app.blueprints.coupon import coupons_bp
from app.blueprints.cart import cart_bp
from app.blueprints.order import order_bp
from app.blueprints.stripe import stripe_bp


def register_blueprints(app):

    from app.blueprints.auth import views

    app.register_blueprint(auth_bp)

    from app.blueprints.user import views

    app.register_blueprint(users_bp)

    from app.blueprints.product import views

    app.register_blueprint(product_bp)

    from app.blueprints.category import views

    app.register_blueprint(category_bp)

    from app.blueprints.coupon import views

    app.register_blueprint(coupons_bp)

    from app.blueprints.cart import views

    app.register_blueprint(cart_bp)

    from app.blueprints.order import views

    app.register_blueprint(order_bp)

    from app.blueprints.stripe import views

    app.register_blueprint(stripe_bp)
