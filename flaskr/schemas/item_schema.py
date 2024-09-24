from flaskr import ma
from flaskr.models.item import Item
from flaskr.schemas import fields, Length, validates_schema, ValidationError


class ItemSchema(ma.SQLAlchemyAutoSchema):
    name = fields.Str(required=True, valdiate=Length(min=2, max=30))
    price = fields.Float(required=True)
    barcode = fields.Str(required=True, valdiate=Length(min=6, max=12))
    description = fields.Str(required=True, valdiate=Length(min=2, max=1024))
    owner = fields.Integer(required=False)

    @validates_schema
    def validate_name(self, data, **kwargs):
        name_to_validate = data.get("name")
        if Item.query.filter_by(name=name_to_validate).first():
            raise ValidationError("Name already exists! Please try a different Name")

    class Meta:
        model = Item
        exclude = ["id"]
        load_instance = True
