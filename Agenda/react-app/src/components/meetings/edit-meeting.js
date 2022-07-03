import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import { editAMeeting, getAllMeetings } from '../../store/meetings';

const EditMeetingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const meeting = useSelector(state => state.meetings.current);
    console.log(meeting, 'this is the current meeting');
    const [title, setTitle] = useState(meeting.title);
    const [start, setStart] = useState(meeting.start);
    const [end, setEnd] = useState(meeting.end);
    const [description, setDescription] = useState(meeting.description);
    const [errors, setErrors] = useState([]);
    console.log(user, 'this is the user....')


    const onSubmit = async(e) => {
        e.preventDefault();
        let form = new FormData();
     
        form.append('id', meeting.id);
        form.append('presenter_id', user.id);
        form.append('title', title);
        form.append('start', start);
        form.append('end', end)
        form.append('description', description);
  

        let data = await dispatch(editAMeeting(form));
        if (data) {
          setErrors(data);
          dispatch(hideModal());
          return;
        }
        dispatch(hideModal());
        dispatch(getAllMeetings());
    }

    return (
        <div>
            <h1>Add a Meeting</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='title'>Title</label>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='enter a title'
                    required={true}
                />
                <label htmlFor='start'>Start</label>
                <input
                    type='time'
                    name='start'
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder='MM/DD/YYYY HH:MM'
                    required={true}
                />
                <label htmlFor='end'>End</label>
                <input
                    type='time'
                    name='end'
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    placeholder='MM/DD/YYYY HH:MM'
                    required={true}
                />
                   <input
                    type='text'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter a description'
                    required={true}
                />
                <button className='create-meeting' type='submit'>edit meeting</button>
            </form>
        </div>
    )
};

export default EditMeetingForm;