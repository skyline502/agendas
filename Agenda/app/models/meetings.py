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
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  comments = relationship('Comment', backref='meeting', cascade='all,delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'presenter_id': self.presenter_id,
      'start': self.start,
      'end': self.end,
      'comments': [{'id': comment.id, 'comment': comment.comment, 'user_id': comment.user_id, 'meeting_id': comment.meeting_id, 'created_at': comment.created_at, 'updated_at': comment.updated_at} for comment in self.comments]
    }



# class Topic(db.Model):
#   __tablename__ = 'topics'

#   id = db.Column(db.Integer, primary_key=True)
#   title = db.Column(db.String(100), nullable=False)
#   time_estimate = db.Column(db.Integer, nullable=False)
#   description = db.Column(db.String(200), nullable=False)
#   meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id', passive_deletes=True), nullable=False)

#   comments = relationship('Comment', backref='topic', cascade='all,delete-orphan')

#   def to_dict(self):
#     return {
#       'id': self.id,
#       'title': self.title,
#       'time_estimate': self.time_estimate,
#       'description': self.description,
#       'meeting_id': self.meeting_id,
#       'comments': [{'id': comment.id, 'comment': comment.comment, 'user_id': comment.user_id, 'topic_id': comment.topic_id, 'created_at': comment.created_at, 'updated_at': comment.updated_at} for comment in self.comments]
#     }

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(200), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id', passive_deletes=True), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'user_id': self.user_id,
      'meeting_id': self.meeting_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
