import React from 'react';

const ExportUserInfo = (props) => {

  return(
    <div className="show-page-text">
      <p>Exported by: {props.user_info.export_belongs_to.username}</p>
      <p>Uploaded by: {props.user_info.upload_belongs_to.username}</p>
      <p>Exported at: {props.created}</p>
    </div>
  )
}

export default ExportUserInfo
