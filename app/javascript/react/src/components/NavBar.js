import React from 'react';
import { Link } from 'react-router';

const NavBar = props => {
  return(
    <div>
      <div className='nav-bar'>
        <span className='title-link'>
          <Link to='/'><p>Pixator</p></Link>
        </span>
        <span className='user-links'>
          <a data-method="delete" rel="nofollow" href="/users/sign_out"><p>Sign out</p></a>
        </span>
      </div>
      {props.children}
    </div>
  )
}

export default NavBar;
