const GET_ALL = 'meetings/getAll';
const CREATE_MEETING = 'meetings/create';
const DELETE_MEETING = 'meetings/delete';
const EDIT_MEETING = 'meetings/edit';
const SET_MEETING = 'meetings/current';


export const setMeeting = (meeting) => ({
  type: SET_MEETING,
    meeting
});

const getMeetings = (meetings) => ({
  type: GET_ALL,
  meetings
});

export const getAllMeetings = () => async dispatch => {
  const response = await fetch('/api/meetings/');
  if (response.ok) {
    const meetings = await response.json();
    dispatch(getMeetings(meetings));
    return meetings;
  }

  return response;
}

const createMeeting = (meeting) => ({
  type: CREATE_MEETING,
  meeting
});

export const createAMeeting = (form) => async dispatch => {
  console.log(form, 'form is in the store....')
  const response = await fetch('/api/meetings/', {
    method: 'POST',
    body: form,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createMeeting(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const deleteMeeting = (id) => ({
  type: DELETE_MEETING,
  id
});

export const deleteAMeeting = (id) => async dispatch => {
  const response = await fetch(`/api/meetings/${id}`, {
    method: 'DELETE',
  });

  const meeting = await response.json();

  dispatch(deleteMeeting(meeting));
}

const editMeeting = (meeting) => ({
  type: EDIT_MEETING,
  meeting
});

export const editAMeeting = (meeting) => async dispatch => {
  let id = meeting.get('id');
  const response = await fetch(`/api/meetings/${id}`, {
    method: 'PUT',
    body: meeting,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editMeeting(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }

}


const meetingReducer = (state = { meetings: [], current: {} }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        meetings: [...action.meetings.meetings]
      }
    case CREATE_MEETING:
      newState = { ...state };
      return newState;
    case DELETE_MEETING:
      newState = { ...state };
      return newState;
    case SET_MEETING: {
      newState.current = { ...action.meeting };
      return newState;
    }
    default:
      return state;
  }
}

export default meetingReducer;
