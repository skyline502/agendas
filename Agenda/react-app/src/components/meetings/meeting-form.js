import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import { createAMeeting, getAllMeetings } from '../../store/meetings';

const MeetingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [errors, setErrors] = useState([]);
    console.log(user, 'this is the user....')

    const onSubmit = async(e) => {
        e.preventDefault();
        let form = new FormData();
     
  
        form.append('presenter_id', user.id);
        form.append('title', title);
        form.append('start', start);
        form.append('end', end)
  

        let data = await dispatch(createAMeeting(form));
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
                    type='text'
                    name='start'
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder='MM/DD/YYYY HH:MM'
                    required={true}
                />
                <label htmlFor='end'>End</label>
                <input
                    type='text'
                    name='end'
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    placeholder='MM/DD/YYYY HH:MM'
                    required={true}
                />
                <button className='create-meeting' type='submit'>create meeting</button>
            </form>
        </div>
    )
};

export default MeetingForm;