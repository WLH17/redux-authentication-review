  
import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/houser_logo.png';
import './Header.css';

function Header(props) {
  //The logout function on the client-side needs to be placed in a convenient location for the user. A dropdown menu or a header are a good place for it. Logouts purpose, like in the server, is to clean up user information. The client-side of logout should also re-route the user to the login/register page if necessary.
  const handleLogout = () => {
    axios.get('/api/logout')
    .then(() => {
      //Clear user info on state or reduxState

      //Re-route user to Auth
      props.history.push('/')
    })
  }

  return (
    <div className='Header'>
      <img src={logo} alt='logo' />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default withRouter(Header);