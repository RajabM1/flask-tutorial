from app import stripe
from app.config import Config
from app.blueprints.stripe import stripe_bp
from app.blueprints.stripe.schemas import PaymentIntentSchema
from flask import jsonify, request
from flask_jwt_extended import jwt_required


@stripe_bp.route("/config", methods=["GET"])
@jwt_required()
def get_payment_config():
    stripe_publishable_key = Config.STRIPE_PUBLISHABLE_KEY
    if not stripe_publishable_key:
        return jsonify({"message": "Publishable key not found"}), 500
    return (
        jsonify(
            {
                "message": "Publishable key retrieved",
                "data": {"publishableKey": stripe_publishable_key},
            }
        ),
        200,
    )


@stripe_bp.route("/create-payment-intent", methods=["POST"])
@jwt_required()
def create_payment_intent():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    payment_schema = PaymentIntentSchema()
    payment_data = payment_schema.load(json_data)

    intent = stripe.PaymentIntent.create(
        amount=payment_data["amount"],
        currency=payment_data["currency"],
        automatic_payment_methods={"enabled": True},
        metadata={"integration_check": "accept_a_payment"},
    )

    return (
        jsonify(
            {
                "message": "Payment intent created",
                "data": {"id": intent["id"], "clientSecret": intent["client_secret"]},
            }
        ),
        200,
    )


@stripe_bp.route("/update-payment-intent", methods=["POST"])
@jwt_required()
def update_payment_intent():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"message": "No input data provided"}), 400

    payment_schema = PaymentIntentSchema()
    payment_data = payment_schema.load(json_data)

    intent = stripe.PaymentIntent.modify(
        id=payment_data["payment_intent_id"],
        amount=payment_data["amount"],
        currency=payment_data["currency"],
    )

    return (
        jsonify(
            {
                "message": "Payment intent updated",
                "data": {"clientSecret": intent["client_secret"]},
            }
        ),
        200,
    )
