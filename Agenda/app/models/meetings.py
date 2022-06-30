from .db import db
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func
from .user import User

class Meeting(db.Model):
  __tablename__ = 'meetings'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  presenter_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  start = db.Column(db.String(16), nullable=False)
  end = db.Column(db.String(16), nullable=False)
  created_at = db.Column(db.Datetime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.Datetime(timezone=True), server_default=func.now())

  topics = relationship('Topic', backref='meeting', cascade='all,delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'presenter_id': self.presenter_id,
      'start': self.start,
      'end': self.end,
      'topics': [{'id': topic.id, 'title': topic.title, 'time_estimate': topic.time_estimate, 'description': topic.description} for topic in self.topics]
    }



class Topic(db.Model):
  __tablename__ = 'topics'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  time_estimate = db.Column(db.Integer, nullable=False)
  description = db.Column(db.String(200), nullable=False)
  meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id', passive_deletes=True), nullable=False)

  comments = relationship('Comment', backref='topic', cascade='all,delete-orphan')

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(200), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  topic_id = db.Column(db.Integer, db.ForeignKey('topics.id', passive_deletes=True), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
