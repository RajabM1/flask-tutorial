from flaskr import ma
from flaskr.models.product.item import Item
from flaskr.schemas import fields, Length, validates, ValidationError, Range, OneOf
from flaskr.enum.ItemStatus import ItemStatus


class ItemSchema(ma.SQLAlchemyAutoSchema):
    category_id = fields.Int(required=True, data_key="category")

    name = fields.Str(required=True, validate=Length(min=2, max=30))
    price = fields.Float(required=True, validate=Range(min=0))
    barcode = fields.Str(required=True, validate=Length(max=12))
    description = fields.Str(required=True, validate=Length(min=2, max=1024))
    image = fields.Str(required=True)
    quantity = fields.Integer(required=True, validate=Range(min=1))
    discount = fields.Float(required=False, validate=Range(min=0))
    status = fields.Str(
        required=False,
        validate=OneOf([status.name for status in ItemStatus]),
    )
    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("name")
    def validate_name(self, name):
        if Item.query.filter(Item.name == name).first():
            raise ValidationError("Name already exists! Please try a different Name")

    @validates("discount")
    def validate_discount(self, discount):
        if discount >= self.price:
            raise ValidationError("Discount cannot be greater than or equal the price.")

    class Meta:
        model = Item
        load_instance = True
