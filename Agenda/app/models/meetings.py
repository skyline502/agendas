from .db import db
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from .user import User

class Meeting(db.Model):
  __tablename__ = 'meetings'

  id = db.Column(db.Integer, primary_key=True)
