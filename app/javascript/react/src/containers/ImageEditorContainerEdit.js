import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageEditor from '../components/ImageEditor';

class ImageEditorContainerEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      current_image: {},
      current_edit: {}
    }
  }

  // get initial state before the page renders via GET/fetch
  componentDidMount(){
    let that = this;
    let id = this.props.params.id;
    fetch(`/api/v1/edits/${id}.json`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type':'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      // debugger
      that.setState({
        current_user: body.current_user,
        current_image: body.current_image,
        current_edit: body.current_edit

      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let imageEditorComponent;
    if (Object.keys(this.state.current_image).length === 0){
      imageEditorComponent = <div></div>
    } else {
      imageEditorComponent = <ImageEditor
        key={1}
        id={1}
        current_user={this.state.current_user}
        current_image={this.state.current_image}
        current_edit={this.state.current_edit}
      />
    }
    return(
      <div>{imageEditorComponent}</div>
    )
  }
}
export default ImageEditorContainerEdit
