import React, {Component} from 'react';
import ExportUserInfo from '../components/ExportUserInfo'
import CommentTile from '../components/CommentTile'
import FormTile from '../components/FormTile'

class ExportShowPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      current_export: {},
      user_info: [],
      comments: []
    }
    this.addNewComment = this.addNewComment.bind(this)
  }

  componentDidMount() {
    let that = this
    let user_id = this.props.params.user_id
    let upload_id = this.props.params.upload_id
    let id = this.props.params.id
    fetch(`/users/${user_id}/uploads/${upload_id}/exports/${id}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(body => {
      that.setState({current_user: body.current_user, current_export: body.current_export, user_info: body.user_info, comments: body.comments})
    })
  }

  addNewComment(formPayLoad) {
    let that = this
    fetch(`/api/v1/comments`,{
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ commentInfo: formPayLoad })
    })
    .then(response => response.json())
    .then(body => {
      let commentsArray = that.state.comments;
      commentsArray.unshift(body);
      that.setState({comments: commentsArray})
    })
  }

  render() {
    let imageToLoad;
    let userInfoPanel;
    let createdAt;
    if (Object.keys(this.state.current_export).length > 0) {
      createdAt = this.state.current_export.created_at
      createdAt = (new Date(Date.parse(createdAt))).toString();
      imageToLoad = <img className='show-page-image' src={this.state.current_export.share.url} />
      userInfoPanel = <ExportUserInfo
                        key={this.state.user_info.export_belongs_to.id}
                        user_info={this.state.user_info}
                        created={createdAt}
                      />
    } else {
      imageToLoad = <div></div>
      userInfoPanel = <div></div>
    }

    let listOfComments;
    if (this.state.comments.length > 0) {
      listOfComments = this.state.comments.map(comment => {
        createdAt = comment.comment.created_at
        createdAt = (new Date(Date.parse(createdAt))).toString();
        return(
          <CommentTile
            key = {comment.comment.id}
            id = {comment.comment.id}
            body = {comment.comment.body}
            username = {comment.username}
            createdAt = {createdAt}
          />
        )
      })
    } else {
      listOfComments = <p id="no-comments-message" className = "small-10 medium-10 large-5 large-offset-1 medium-offset-1 small-offset-1 cell comment-tile">Let the creator know your thoughts by adding a comment!</p>
    }


    return(
      <div>
        <div className="grid-container">
          <div className="grid-x">
            <div className="small-10 medium-5 large-5 large-offset-1 medium-offset-1 small-offset-1 cell show-page-panels">
              {imageToLoad}
            </div>
            <div className="small-10 medium-5 large-5 medium-offset-1 small-offset-1 cell show-page-panels">
              {userInfoPanel}
            </div>
          </div>
        </div>

        <div className="grid-x">
          <div className="small-10 medium-10 large-5 large-offset-1 medium-offset-1 small-offset-1 cell comment-form-tile">
            <FormTile
              addNewComment = {this.addNewComment}
              current_user = {this.state.current_user}
              current_export = {this.state.current_export}
            />
          </div>
          {listOfComments}
        </div>
      </div>
    )
  }
}

export default ExportShowPage
