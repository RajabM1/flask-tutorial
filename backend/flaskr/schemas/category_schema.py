from flaskr import ma
from flaskr.models.category import Category
from flaskr.schemas import fields, Length, validates, ValidationError


class CategorySchema(ma.SQLAlchemyAutoSchema):
    name = fields.Str(required=True, validate=Length(min=2, max=30))
    image = fields.Str(required=True)

    @validates("name")
    def validate_name(self, name):
        if Category.query.filter(Category.name == name).first():
            raise ValidationError("Name already exists! Please try a different Name")

    class Meta:
        model = Category
        load_instance = True
