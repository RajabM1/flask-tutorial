from flaskr import db


class Item(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(length=30), nullable=False, unique=True)
    price = db.Column(db.Float(), nullable=False)
    barcode = db.Column(db.String(length=12), nullable=False)
    description = db.Column(db.String(length=1024), nullable=False)
    owner = db.Column(db.Integer(), db.ForeignKey("user.id"))

    def buy(self, current_user):
        self.owner = current_user.id
        current_user.budget -= self.price
        db.session.commit()

    def sell(self, current_user):
        self.owner = None
        current_user.budget += self.price
        db.session.commit()
