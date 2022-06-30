from .db import db
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from .user import User

class Meeting(db.Model):
  __tablename__ = 'meetings'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  presenter_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  start = db.Column(db.Datetime(timezone=True))
  end = db.Column(db.Datetime(timezone=True))
  created_at = db.Column(db.Datetime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.Datetime(timezone=True), server_default=func.now())
