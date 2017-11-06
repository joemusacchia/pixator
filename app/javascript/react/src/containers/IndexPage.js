import React, {Component} from 'react';
import { Link } from 'react-router';
import ImageTile from '../components/ImageTile'

class IndexPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: [],
      uploads: [],
      edits: [],
      exports: []
    }
    this.sendDataToAPI = this.sendDataToAPI.bind(this);
    this.readFile = this.readFile.bind(this)
  }

  componentDidMount(){
    let that = this;
    fetch('/api/v1/uploads.json', {
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
      that.setState({
        current_user: body.current_user,
        uploads: body.uploads,
        edits: body.edits,
        exports: body.exports
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }




  readFile(selectorFiles: FileList) {
    if (selectorFiles && selectorFiles[0]) {
      let fd = new FormData();
      fd.append('file', selectorFiles[0]);
      this.sendDataToAPI(fd)
    }
  }

  sendDataToAPI(binaryDataURL){
    console.log(binaryDataURL)

    fetch(`/api/v1/users/${this.state.current_user.id}/uploads`, {
      credentials: 'same-origin',
      headers: {},
      method: 'POST',
      body: binaryDataURL
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
      this.setState({uploads: this.state.uploads.concat(body)})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  render() {
    let newUploadTiles;
    if (this.state.uploads.length > 0) {
      newUploadTiles = this.state.uploads.map(upload => {
        return(
          <ImageTile
            key = {new Date().getTime() + upload.id}
            id = {upload.id}
            image = {upload.file}
            user_id = {upload.user_id}
          />
        )
      })
    } else {
      newUploadTiles = <p>You haven't uploaded any photos yet!</p>
    }

    let editedImageTiles;
    if (this.state.edits > 0) {

    } else {
      editedImageTiles = <p>You haven't edited any photos yet!</p>
    }

    let exportedImageTiles;
    if (this.state.exports > 0) {

    } else {
      exportedImageTiles = <p>You haven't saved any photos yet for comments!</p>
    }

    return(
      <div>
        <h1>Index page</h1>
        <div className="image-upload">
          <input id="inp" type='file' onChange={(e) => this.readFile(e.target.files)}/>
        </div>
        <div className="image-tile-container">
          {newUploadTiles}
        </div>
        <div className="image-tile-container">
          {editedImageTiles}
        </div>
        <div className="image-tile-container">
          {exportedImageTiles}
        </div>
        <Link to='/images'>Image editor</Link>
      </div>
    )
  }
}

export default IndexPage
