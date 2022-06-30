from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Meeting, Topic, Comment
from sqlalchemy import desc
import json


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
  return {'meetings': meeting_array}
