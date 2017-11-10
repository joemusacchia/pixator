import React, {Component} from 'react';
import ExportUserInfo from '../components/ExportUserInfo'

class ExportShowPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      current_export: {},
      user_info: []
    }
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
      that.setState({current_user: body.current_user, current_export: body.current_export, user_info: body.user_info})
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
    return(
      <div className="grid-container">
        <div className="grid-x">
          {/* <div className="small-10 medium-8 large-6 large-offset-3 medium-offset-2 small-offset-1 cell"> */}
          <div className="small-10 medium-5 large-5 large-offset-1 medium-offset-1 small-offset-1 cell show-page-panels">
            {imageToLoad}
          </div>
          <div className="small-10 medium-5 large-5 medium-offset-1 small-offset-1 cell show-page-panels">
            {userInfoPanel}
          </div>
        </div>
      </div>
    )
  }
}

export default ExportShowPage
