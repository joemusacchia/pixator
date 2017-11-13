import React from 'react'

const CommentTile = (props) => {
  return(
    <div className="small-10 medium-10 large-5 large-offset-1 medium-offset-1 small-offset-1 cell comment-tile">
      <div className="grid-x">
        <div className="small-3 medium-3 large-3 cell comment-contents comment-contents-left-panel">
          <p className="comment-username">{props.username}</p>
          <p className="comment-date">{props.createdAt}</p>
        </div>
        <div className="small-9 medium-9 large-9 cell comment-contents comment-contents-right-panel">
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentTile
