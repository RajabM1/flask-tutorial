from flaskr import ma
from flaskr.models.product.item_discount import ItemDiscount
from flaskr.schemas import fields, Length, validates, ValidationError, Range


class ItemDiscountSchema(ma.SQLAlchemyAutoSchema):
    name = fields.Str(required=True, validate=Length(min=2, max=50))
    discount_percent = fields.Float(
        required=True, validate=Range(min=0, max=100), data_key="discountPercent"
    )
    active = fields.Boolean(required=True)

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("name")
    def validate_name(self, name):
        if ItemDiscount.query.filter(ItemDiscount.name == name).first():
            raise ValidationError("Name already exists! Please try a different Name")

    class Meta:
        model = ItemDiscount
        load_instance = True
