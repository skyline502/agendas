
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  if (user) {
    return (
      <nav className='nav-bar'>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Employees
            </NavLink>
          </li>
          <li>
            <h4><i className="fas fa-user"></i>&nbsp;&nbsp;{user.username}</h4>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className='nav-bar'>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
