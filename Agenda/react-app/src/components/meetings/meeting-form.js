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
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        let form = new FormData();

        if (description.length > 200) {
            setErrors(['Description must be 200 characters or less!']);
            return;
        }

        form.append('presenter_id', user.id);
        form.append('title', title);
        form.append('start', start);
        form.append('end', end);
        form.append('description', description);


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
        <div className='form-container'>
            <h1>Add a Meeting</h1>
            {errors?.map(error => (
                <div key={error} style={{color: 'red'}}>{error}</div>
            ))}
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
                <textarea
                    type='text'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter a description'
                    required={true}
                />
                <button className='create-meeting' type='submit'>create</button>
            </form>
        </div>
    )
};

export default MeetingForm;