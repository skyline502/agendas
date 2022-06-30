const GET_ALL = 'meetings/getAll';


const getMeetings = (meetings) => ({
  type: GET_ALL,
  meetings
});

export const getAllMeetings = () => async dispatch => {
  const response = await fetch('/api/meetings');
  if (response.ok) {
    const meetings = await response.json();
    dispatch(getMeetings(meetings));
    return meetings;
  }

  return response;
}

const meetingReducer = (state = {meetings: [], action}) => {
  let newState = {...state};
  switch(action.type) {
    case GET_ALL:
      return {
        ...state,
        meetings: [...action.meetings.meetings]
      }
    default:
      return state;
  }
}

export default meetingReducer;
