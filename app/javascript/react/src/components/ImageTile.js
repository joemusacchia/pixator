import React from 'react';
import { Link } from 'react-router'

const ImageTile = (props) => {
  let linkComponent;
  if (props.image_type_flag === 1) {
    linkComponent = <Link to={`/editor/users/${props.user_id}/uploads/${props.id}`}><img crossOrigin="anonymous" src={props.image.medium.url} alt="user image upload"/></Link>
  } else if (props.image_type_flag === 2) {
    linkComponent = <Link to={`/edits/${props.id}`}><img crossOrigin="anonymous" src={props.image.medium.url} alt="user image edit"/></Link>
  } else {
    linkComponent = <Link to={`/exported/users/${props.user_id}/uploads/${props.upload_id}/exports/${props.id}`}><img crossOrigin="anonymous" src={props.image.medium.url} alt="user image upload"/></Link>
  }
  return(
    <div className= "small-12 medium-6 large-4 cell image-tile">
      {linkComponent}
      <p>{props.username}</p>
    </div>
  )
}

export default ImageTile
