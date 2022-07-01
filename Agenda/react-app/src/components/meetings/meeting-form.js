import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MeetingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    console.log(user, 'this is the user....')
    return (
        <div>
            <h1>Add a Meeting</h1>
            <form>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='enter a title'
                    required={true}
                />
                <input
                    type='text'
                    name='start'
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder='MM/DD/YYYY HH:MM'
                    required={true}
                />
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