import React from 'react';
import { Link } from 'react-router';

const NavBar = props => {
  return(
    <div className = "grid-container">
      <div className='grid-x nav-bar' data-options="is_hover: false">
        <Link to='/'><button id="title-link" className='small-12 medium-6 large-2 cell nav-bar-links'>Pixator</button></Link>
        <a data-method="delete" rel="nofollow" href="/users/sign_out" ><button className='small-12 medium-6 large-2 large-offset-8 cell nav-bar-links'>Sign out</button></a>
      </div>
      {props.children}
    </div>
  )
}

export default NavBar;
