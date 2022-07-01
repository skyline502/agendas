import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMeetings } from '../store/meetings';
import './Home.css';

const Home = () => {
  const user = useSelector(state => state.session.user);
  const meetings = useSelector(state => state.meetings.meetings);
  const dispatch = useDispatch();
  let date = new Date();
  let formattedDate = date.toDateString().split(' ').slice(1)
  formattedDate[0] += '.';
  formattedDate[1] += ',';
  formattedDate.join(' ');

  console.log(meetings, 'meetings....')
  useEffect(() => {
    dispatch(getAllMeetings());
  },[dispatch])

  // const meetings = useSelector(state => state.session.meetings);
  console.log(user, 'this is the user');
  // console.log(meetings, 'these are the meetings')
  return (
    <div className='home-container'>
      <h1>{formattedDate}'s Agenda</h1>
      <h2>Meetings Today</h2>
      {meetings?.map(meeting => (
        <div key={meeting.id} className='meeting-container'>
          <div>Meeting: {meeting.title}</div>
          <div>
            <ul>Topics:
              {meeting.topics?.map(topic => (
                <div key={topic.id}>
                  <div>{topic.title}:{topic.description}({topic.time_estimate}&nbsp;minutes)</div>
                  {topic.comments?.map(comment => (
                    <div key={comment.id}>{comment.user_id.username}:{comment.comment}</div>
                  ))}
                </div>
              ))}
            </ul>
          </div>
          <div>Start: {meeting.start}</div>
          <div>End: {meeting.end}</div>
          <div>Presenter: {meeting.presenter_id.username}</div>
        </div>
      ))}
    </div>
  )
}

export default Home;
