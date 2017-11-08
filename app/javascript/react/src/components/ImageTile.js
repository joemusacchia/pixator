import React from 'react';
import { Link } from 'react-router'

const ImageTile = (props) => {
  let linkComponent;
  if (props.image_type_flag === 1) {
    linkComponent = <Link to={`/users/${props.user_id}/uploads/${props.id}`}><img className="image-tile" crossOrigin="anonymous" src={props.image.url} alt="user image upload"/></Link>
  } else if (props.image_type_flag === 2) {
    linkComponent = <Link to={`/edits/${props.id}`}><img className="image-tile" crossOrigin="anonymous" src={props.image.url} alt="user image edit"/></Link>
  } else {
    linkComponent = <Link to={`/users/${props.user_id}/uploads/${props.upload_id}/exports/${props.id}`}><img crossOrigin="anonymous" className="image-tile" src={props.image.url} alt="user image upload"/></Link>
  }
  return(
    <div>
      {linkComponent}
    </div>
  )
}

export default ImageTile
