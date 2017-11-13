import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SliderTile from '../components/SliderTile';
import { browserHistory } from 'react-router'

class ImageEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: this.props.current_user,
      current_image: this.props.current_image,
      current_edit: this.props.current_edit,
      redirect: false
    }
  }

  // page will only render on page load
  shouldComponentUpdate(){
    return false
  }

  componentDidMount(){
    let that = this;

    let img = new Image();

    img.crossOrigin = "Anonymous";

    img.src = this.state.current_image.file.url
    img.onload = function() {
      // grab initial data;
      let canvasOringinal = document.getElementById('myCanvas');
      canvasOringinal.setAttribute("width", `${img.naturalWidth}`)
      canvasOringinal.setAttribute("height", `${img.naturalHeight}`)
      let ctxOriginal = canvasOringinal.getContext('2d');
      ctxOriginal.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      img.style.display = 'none';
      let originalImageData = ctxOriginal.getImageData(0, 0, canvasOringinal.width, canvasOringinal.height)
      let originalData = originalImageData.data;

      changeSliderValue(this, originalData, that)
    }

    function changeSliderValue(img, originalData, that) {
      //set initial state of canvas
      let canvas = document.getElementById('myCanvas');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      ctx.fillStyle = '#ffffff'
      img.style.display = 'none';
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data;

      let sliderR = document.getElementById('1');
      let sliderG = document.getElementById('2');
      let sliderB = document.getElementById('3');
      let textToPaint = ""

      let canvasTextField = document.getElementById("canvasText")


      if (Object.keys(that.state.current_edit).length != 0) {
        textToPaint = that.state.current_edit.text_body
        canvasTextField.value = textToPaint

        let getRSliderFloat = sliderR.valueAsNumber/255
        let getGSliderFloat = sliderG.valueAsNumber/255
        let getBSliderFloat = sliderB.valueAsNumber/255

        let i
        for (i = 0; i < data.length; i += 4) {
          data[i] = Math.round(originalData[i] * getRSliderFloat)
          data[i + 1] = Math.round(originalData[i + 1] * getGSliderFloat)
          data[i + 2] = Math.round(originalData[i + 2] * getBSliderFloat)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textToPaint, 10, 10);
      }







      let changeRChannel = () => {
        let sliderValue8Bit = sliderR.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i] = Math.round(originalData[i] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textToPaint, 10, 10);
      }


      let changeGChannel = () => {
        let sliderValue8Bit = sliderG.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i + 1] = Math.round(originalData[i + 1] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textToPaint, 10, 10);
      }


      let changeBChannel = () => {
        let sliderValue8Bit = sliderB.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i + 2] = Math.round(originalData[i + 2] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textToPaint, 10, 10);
      }

      sliderR.addEventListener('input',changeRChannel);
      sliderG.addEventListener('input',changeGChannel);
      sliderB.addEventListener('input',changeBChannel);





      let uploadImage = (e) => {
        let currentCanvas = document.getElementById('myCanvas');
        let dataURL = currentCanvas.toDataURL()

        let upload_id = that.state.current_image.id
        let user_id = that.state.current_user.id

        let newBlob = dataURLtoBlob(dataURL)
        let lastSlashIndex = that.state.current_image.file.url.lastIndexOf("/")
        let originalFileName = that.state.current_image.file.url.substr(lastSlashIndex + 1, that.state.current_image.file.url.length)
        let file = new File([newBlob], `upload_id_${upload_id}_user_id_${user_id}_${originalFileName}`);

        let formPayLoad = new FormData();
        formPayLoad.append('share', file);

        let uploadNotice = document.getElementById("upload-notice")
        uploadNotice.innerHTML = "Exporting image..."
        fetch(`/api/v1/users/${user_id}/uploads/${upload_id}/exports`, {
          credentials: 'same-origin',
          headers: {},
          method: 'POST',
          body: formPayLoad
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
        .then(response => {
          if (response.status === 200) {
            browserHistory.push('/')
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));


        // function from: https://stackoverflow.com/questions/21707595/how-to-save-base64-image-in-blob-with-carrierwave-in-rails4
        function dataURLtoBlob(dataURL) {

          // Decode the dataURL
          var binary = atob(dataURL.split(',')[1]);

          // Create 8-bit unsigned array
          var array = [];
          for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }

          // Return our Blob object
          return new Blob([new Uint8Array(array)], {type: 'image/png'});
        }

      }
      let uploadButton = document.getElementById('upload-button')
      uploadButton.addEventListener('click', uploadImage)








      let saveEditorState = () => {
        let statePayLoad = {
          sliderRValue: sliderR.valueAsNumber,
          sliderGValue: sliderG.valueAsNumber,
          sliderBValue: sliderB.valueAsNumber,
          currentUser: that.state.current_user,
          uploadedImage: that.state.current_image,
          textBody: textToPaint
        }

        let user_id = that.state.current_user.id
        let upload_id = that.state.current_image.id
        if ((Object.keys(that.state.current_edit).length === 0) || (that.state.current_edit.user_id != user_id)) {
          fetch(`/api/v1/users/${user_id}/uploads/${upload_id}/edits`,{
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ editorState: statePayLoad })
          })
          .then(response => {
            if (response.status === 204) {
              let editSuccessful = document.getElementById("save-notice");
              editSuccessful.innerHTML = "Edit saved sucessfully"
            }
          })

        } else if (that.state.current_edit.user_id === user_id) {
          let edit_id = that.state.current_edit.id
          fetch(`/api/v1/users/${user_id}/uploads/${upload_id}/edits/${edit_id}`,{
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ editorState: statePayLoad })
          })
          .then(response => {
            if (response.status === 204) {
              let editSuccessful = document.getElementById("save-notice");
              editSuccessful.innerHTML = "Edit saved sucessfully"
            }
          })
        }

      }

      let saveStateButton = document.getElementById('save-state-button')
      saveStateButton.addEventListener('click', saveEditorState)






      let handleTextChange = (event) => {
        textToPaint = event.target.value
        let getRSliderFloat = sliderR.valueAsNumber/255
        let getGSliderFloat = sliderG.valueAsNumber/255
        let getBSliderFloat = sliderB.valueAsNumber/255

        let i
        for (i = 0; i < data.length; i += 4) {
          data[i] = Math.round(originalData[i] * getRSliderFloat)
          data[i + 1] = Math.round(originalData[i + 1] * getGSliderFloat)
          data[i + 2] = Math.round(originalData[i + 2] * getBSliderFloat)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(textToPaint, 10, 10);

      }

      canvasTextField.addEventListener('change', handleTextChange)
      canvasTextField.addEventListener('keyup', handleTextChange)



    }
  }

  render(){
    let redValue;
    let greenValue;
    let blueValue;
    if (Object.keys(this.state.current_edit).length === 0) {
      redValue = "255";
      greenValue = "255";
      blueValue = "255";
    } else {
      redValue = `${this.state.current_edit.slider_r}`
      greenValue = `${this.state.current_edit.slider_g}`
      blueValue = `${this.state.current_edit.slider_b}`
    }


    return(
      <div className="grid-container">
        <div className="grid-x editor-panels">
          <div className="small-12 large-6 large-offset-1 cell editor-elements">
            <canvas id="myCanvas"/>
          </div>
          <div className="small-12 large-4 cell editor-elements editor-controls">
            <h3 className="controls-title">Slider controls:</h3>
            <div className="slider-group">
              <p>Red channel</p>
              <SliderTile
                key = {1}
                id = {"1"}
                value = {redValue}
              />
            </div>
            <div className="slider-group">
              <p>Green channel</p>
              <SliderTile
                key = {2}
                id = {"2"}
                value = {greenValue}
              />
            </div>
            <div className="slider-group">
              <p>Blue channel</p>
              <SliderTile
                key = {3}
                id = {"3"}
                value = {blueValue}
              />
            </div>
            <div className="text-field">
              <form>
                <label>Text onto canvas
                  <textarea
                    id={"canvasText"}
                    name={"canvasText"}
                    type="text"
                  />
                </label>
              </form>
            </div>
            <div className="button-group">
              <div>
                <button className="upload-button" id="upload-button">Upload image</button>
                <p id="upload-notice"></p>
              </div>
              <div>
                <button className="upload-button" id="save-state-button">Save edit</button>
                <p id="save-notice"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageEditor
