from flaskr import ma
from flaskr.models.product.category import Category
from flaskr.schemas import fields, Length, validates, ValidationError


class CategorySchema(ma.SQLAlchemyAutoSchema):
    name = fields.Str(required=True, validate=Length(min=2, max=30))
    image = fields.Str(required=True)

    created_at = fields.DateTime(dump_only=True, data_key="createdAt")
    updated_at = fields.DateTime(dump_only=True, data_key="updatedAt")

    @validates("name")
    def validate_name(self, name):
        if Category.query.filter(Category.name == name).first():
            raise ValidationError("Name already exists! Please try a different Name")

    class Meta:
        model = Category
        load_instance = True
