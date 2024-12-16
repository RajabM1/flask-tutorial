from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from app.extensions import db
from app.blueprints.auth.models import TokenBlacklist
from itsdangerous import SignatureExpired, BadSignature


def register_error_handler(app, jwt):
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        jwt_obj = TokenBlacklist.query.filter_by(jti=jti).first()
        if not jwt_obj:
            return False
        return jwt_obj.is_expired

    @app.errorhandler(SQLAlchemyError)
    def handle_sqlalchemy_error(err):
        db.session.rollback()
        return {
            "error": "A database error occurred.",
            "message": str(err),
        }, 500

    @app.errorhandler(ValidationError)
    def handle_validation_error(err):
        return {
            "error": "A validation error occurred.",
            "message": str(err),
        }, 400

    @app.errorhandler(ValueError)
    def handle_value_error(err):
        return {
            "error": "A value error occurred.",
            "message": str(err),
        }, 400

    @app.errorhandler(404)
    def not_found_error(err):
        return {
            "error": "The requested resource could not be found.",
            "message": str(err),
        }, 404

    @app.errorhandler(415)
    def unsupported_media_type(err):
        return {
            "error": "Unsupported Media Type. Ensure Content-Type is application/json.",
            "message": str(err),
        }, 415

    @app.errorhandler(500)
    def internal_server_error(err):
        return {
            "error": "An unexpected error occurred. Please try again later.",
            "message": str(err),
        }, 500

    @app.errorhandler(Exception)
    def handle_unexpected_error(err):
        return {
            "error": "An unexpected error occurred. Please try again later.",
            "message": str(err),
        }, 500

    @app.errorhandler(SignatureExpired)
    def handle_signature_expired(err):
        return {
            "error": "The reset link has expired.",
            "message": str(err),
        }, 500

    @app.errorhandler(BadSignature)
    def handle_bad_signature(err):
        return {
            "error": "Invalid or tampered token.",
            "message": str(err),
        }, 500
