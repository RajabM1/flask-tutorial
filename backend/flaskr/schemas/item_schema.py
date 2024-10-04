from flaskr import ma
from flaskr.models.item import Item
from flaskr.schemas import fields, Length, validates, ValidationError, Range


class ItemSchema(ma.SQLAlchemyAutoSchema):
    name = fields.Str(required=True, validate=Length(min=2, max=30))
    price = fields.Float(required=True, validate=Range(min=0))
    barcode = fields.Str(required=True, validate=Length(max=12))
    description = fields.Str(required=True, validate=Length(min=2, max=1024))
    owner = fields.Integer(required=False)

    @validates("name")
    def validate_name(self, name):
        if Item.query.filter(Item.name == name).first():
            raise ValidationError("Name already exists! Please try a different Name")

    class Meta:
        model = Item
        load_instance = True
