import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.session.user);
  // const meetings = useSelector(state => state.session.meetings);
  console.log(user, 'this is the user');
  // console.log(meetings, 'these are the meetings')
  return (
    <h1>Today's Agenda</h1>
  )
}

export default Home;
