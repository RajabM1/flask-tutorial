from app import create_app
from app.extensions import db
from app.config import DevelopmentConfig

app = create_app(DevelopmentConfig)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run()
