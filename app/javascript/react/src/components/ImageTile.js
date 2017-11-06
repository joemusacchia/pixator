import React from 'react';
import { Link } from 'react-router'

const ImageTile = (props) => {
  return(
    <div>
      <Link to={`/users/${props.user_id}/uploads/${props.id}`}><img className="image-tile" src={props.image.url} alt="user image upload"/></Link>
    </div>
  )
}

export default ImageTile
