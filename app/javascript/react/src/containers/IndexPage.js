import React, {Component} from 'react';
import { Link } from 'react-router';
import ImageTile from '../components/ImageTile'
import Dropzone from 'react-dropzone'

class IndexPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: {},
      uploads: [],
      edits: [],
      exports: [],
      users: []
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
        exports: body.exports,
        users: body.users
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
        let username = this.state.users.filter(user =>{
          return upload.user_id === user.id
        })
        return(
          <ImageTile
            key = {new Date().getTime() + upload.id}
            id = {upload.id}
            image = {upload.file}
            user_id = {upload.user_id}
            image_type_flag = {1}
            upload_id = {upload.id}
            username = {username[0].username}
          />
        )
      })
    } else {
      newUploadTiles = <p>You haven't uploaded any photos yet!</p>
    }

    let editedImageTiles;
    if (this.state.edits.length > 0) {
      editedImageTiles = this.state.edits.map(edit =>{
        let editedUpload;
        this.state.uploads.forEach(upload => {
          if (upload.id === edit.upload_id) {
            editedUpload = upload
          }
        })
        let username = this.state.users.filter(user =>{
          return edit.user_id === user.id
        })
        return(
          <ImageTile
            key = {new Date().getTime() + edit.id + 12345}
            id = {edit.id}
            image = {editedUpload.file}
            user_id = {edit.user_id}
            image_type_flag = {2}
            upload_id = {edit.upload_id}
            username = {username[0].username}
          />
        )
      })
    } else {
      editedImageTiles = <p>You haven't edited any photos yet!</p>
    }

    let exportedImageTiles;
    if (this.state.exports.length > 0) {
      exportedImageTiles = this.state.exports.map(exportedImage => {
        let username = this.state.users.filter(user =>{
          return exportedImage.user_id === user.id
        })
        return(
          <ImageTile
            key = {new Date().getTime() + exportedImage.id + 56789}
            id = {exportedImage.id}
            image = {exportedImage.share}
            user_id = {exportedImage.user_id}
            image_type_flag = {3}
            upload_id = {exportedImage.upload_id}
            username = {username[0].username}
          />
        )
      })

    } else {
      exportedImageTiles = <p>You haven't saved any photos yet for comments!</p>
    }

    return(
      <div className="index-page">
        <div className="grid-container">
          <div className="grid-x page-intro">
            <div className="large-10 medium-10 small-10 large-offset-1 medium-offset-1 small-offset-1 cell">
              <h2 className="welcome">Welcome!</h2>
              <h5>Pixator is a collaborative image editing tool. You can upload images and save your progress inside the editor.
                Other users can access your edits and save their changes as new edits.
                When you are satisfied with your edit, you can export it to be saved here!

                <br/><br/>Enjoy!
              </h5>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-x upload-header">
            <div className="small-1 medium-1 large-1 large-offset-1 medium-offset-1 small-offset-1 cell image-upload">
              <h3>Uploads</h3>
            </div>
            <div className="small-3 medium-3 large-3 large-offset-6 medium-offset-6 small-offset-6 cell image-upload">
                <div className="upload-button-wrapper">
                  <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={this.readFile} className="button-dropzone"
                  >
                    <button className="upload-button">Upload a new image</button>
                  </Dropzone>
                </div>
            </div>
          </div>
        </div>

        <div className="grid-container">
          <div className="grid-x image-tile-container">
            {newUploadTiles}
          </div>
        </div>

        <div className="grid-container">
          <div className="grid-x upload-header">
            <div className="small-1 medium-1 large-1 large-offset-1 medium-offset-1 small-offset-1 cell">
              <h3>Edits</h3>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-x image-tile-container">
            {editedImageTiles}
          </div>
        </div>

        <div className="grid-container">
          <div className="grid-x upload-header">
            <div className="small-1 medium-1 large-1 large-offset-1 medium-offset-1 small-offset-1 cell">
              <h3>Exports</h3>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-x image-tile-container">
            {exportedImageTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
