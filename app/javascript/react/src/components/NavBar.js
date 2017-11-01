import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {
  return(
    <div>
      <Link to='/'>Pixator</Link>
      <a data-method="delete" rel="nofollow" href="/users/sign_out">Sign out</a>
      {props.children}
    </div>
  )
}

export default NavBar;
