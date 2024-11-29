from app import stripe
from app.config import Config
from app.blueprints.stripe import stripe_bp
from flask import jsonify, request


@stripe_bp.route("/config", methods=["GET"])
def get_payment_config():
    stripe_publishable_key = Config.STRIPE_PUBLISHABLE_KEY
    if not stripe_publishable_key:
        return jsonify({"message": "Publishable key not found"}), 500
    return jsonify({"publishableKey": stripe_publishable_key}), 200


@stripe_bp.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        payment_data = request.get_json()

        if not payment_data:
            return jsonify({"message": "No input data provided"}), 400

        intent = stripe.PaymentIntent.create(
            amount=payment_data["amount"],
            currency=payment_data["currency"],
            automatic_payment_methods={"enabled": True},
            metadata={"integration_check": "accept_a_payment"},
        )
        return jsonify({"clientSecret": intent["client_secret"]}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 403
