from flaskr import db

# Manage and store blacklisted JWT,
# The tokens are blacklisted if the user logout and the token is still valid (its expiration time hasn’t passed).


class TokenBlacklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    identity = db.Column(db.String(30), nullable=False, unique=True)
    is_expired = db.Column(db.Boolean, default=False)

    def insert_or_update(identity, jti):
        blacklist_entry = TokenBlacklist.query.filter_by(identity=identity).first()

        if blacklist_entry:
            blacklist_entry.jti = jti
            db.session.commit()
            return

        new_entry = TokenBlacklist(jti=jti, identity=identity, is_expired=True)
        db.session.add(new_entry)
        db.session.commit()
