import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMeetings } from "../store/meetings";
import "./Home.css";
import MeetingForm from "./meetings/meeting-form";
import { showModal, setCurrentModal } from "../store/modal";
import { deleteAMeeting } from "../store/meetings";
import EditMeetingForm from "./meetings/edit-meeting";
import { setMeeting } from "../store/meetings";

const Home = () => {
  const user = useSelector((state) => state.session.user);
  const meetings = useSelector((state) => state.meetings.meetings);
  const dispatch = useDispatch();
  let date = new Date();
  let formattedDate = date.toDateString().split(" ").slice(1);
  formattedDate[0] += ".";
  formattedDate[1] += ",";
  formattedDate.join(" ");

  const showAddMeeting = () => {
    dispatch(setCurrentModal(MeetingForm));
    dispatch(showModal());
  }

  const deleteMeeting = (id) => {
    dispatch(deleteAMeeting(id));
    dispatch(getAllMeetings());
  }

  const editMeeting = (meeting) => {
    dispatch(setMeeting(meeting));
    dispatch(setCurrentModal(EditMeetingForm));
    dispatch(showModal());
  }

  function timeEstimate(start, end) { //https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript
    start = start.split(":");
    end = end.split(":");
    let startDate = new Date(0, 0, 0, start[0], start[1], 0);
    let endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
       hours = hours + 24;

    return hours + " hours " + minutes + ' minutes.';
}

  console.log(meetings, "meetings....");
  useEffect(() => {
    dispatch(getAllMeetings());
  }, [dispatch]);

  // const meetings = useSelector(state => state.session.meetings);
  console.log(user, "this is the user");
  // console.log(meetings, 'these are the meetings')
  return (
    <div className="home-container">
      <h1>{formattedDate}'s Agenda</h1>
      <h2>Meetings Today</h2>
      <button onClick={() => showAddMeeting()}>Add Meeting</button>
      {meetings?.map((meeting) => (
        <div key={meeting.id} className="meeting-container">
          <div>Meeting: {meeting.title}</div>
          <div>Start: {meeting.start}</div>
          <div>End: {meeting.end}</div>
          <div>Time Estimate:&nbsp;{timeEstimate(meeting.start, meeting.end)}</div>
          <div>Presenter: {meeting.presenter_id.username}</div>
          {meeting.presenter_id.id === user.id ?
            <div>
              <button onClick={() => deleteMeeting(meeting.id)}>delete</button>
              <button onClick={() => editMeeting(meeting)}>edit</button>
            </div> : <></>}
        </div>
      ))}
    </div>
  );
};

export default Home;
