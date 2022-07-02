from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Meeting, Comment
from sqlalchemy import desc
import json
from datetime import datetime


meeting_routes = Blueprint('meetings', __name__)

@meeting_routes.route('/')
@login_required
def meetings():
  meetings = Meeting.query.all();
  meeting_array = []
  for meeting in meetings:
    meeting_array.append(meeting.to_dict())
  for meeting in meeting_array:
        meeting['presenter_id'] = User.query.get(meeting['presenter_id']).to_dict()
        for comment in meeting['comments']:
          comment['user_id'] = User.query.get(comment['user_id']).to_dict()
  return {'meetings': meeting_array}

@meeting_routes.route('/', methods=['POST'])
@login_required
def createmeeting():
      title=request.form['title']
      presenter_id=request.form['presenter_id']
      start=request.form['start']
      end=request.form['end']

      newMeeting = Meeting(
        title=request.form['title'],
        presenter_id=request.form['presenter_id'],
        start=request.form['start'],
        end=request.form['end']
      )

      db.session.add(newMeeting)
      db.session.commit()

      return newMeeting.to_dict()

@meeting_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_meeting(id):
  meeting = Meeting.query.get(id)
  db.session.delete(meeting)
  db.session.commit()
  return {'meeting': id}

@meeting_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_meeting(id):
  print('does it get back here.....')
  meeting = Meeting.query.get(id)


  meeting.title = request.form['title']
  meeting.start = request.form['start']
  meeting.end = request.form['end']
  meeting.updated_at = datetime.now()
  db.session.commit()

  return meeting.to_dict();  

