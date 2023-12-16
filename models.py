"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Text

db = SQLAlchemy()

DEFAULT_PIC = "https://tinyurl.com/demo-cupcake"

def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake model."""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_PIC)

    def serialize(self):
        """Returns dict representation of cupcake instance which can turn into JSON"""

        return {"id": self.id, "flavor": self.flavor, "size": self.size, "rating": self.rating, "image": self.image}
