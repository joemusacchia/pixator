import React, {Component} from 'react';

class ExportShowPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      current_export: {}
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
      that.setState({current_user: body.current_user, current_export: body.current_export})
    })
  }

  render() {
    let imageToLoad;
    if (Object.keys(this.state.current_export).length > 0) {
      imageToLoad = <img src={this.state.current_export.share.url} />
    } else {
      imageToLoad = <div></div>
    }
    return(
      <div>
        {imageToLoad}
      </div>
    )
  }
}

export default ExportShowPage
