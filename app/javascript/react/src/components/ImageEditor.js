import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SliderTile from '../components/SliderTile';
// import 'images/rhino.jpg'

class ImageEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: this.props.current_user,
      current_image: this.props.current_image,
      current_edit: this.props.current_edit
    }
  }

  // page will only render on page load
  shouldComponentUpdate(){
    return false
  }

  componentDidMount(){
    let that = this;

    let img = new Image();
    // img.src = 'https://s3.amazonaws.com/starcation-new-development/uploads/celestial/photo/1/Jupiter_and_its_shrunken_Great_Red_Spot.jpg';
    img.crossOrigin = "Anonymous";
    img.src = this.state.current_image.file.url
    img.onload = function() {
      let canvasOringinal = document.getElementById('myCanvas');
      let ctxOriginal = canvasOringinal.getContext('2d');
      ctxOriginal.drawImage(img, 0, 0);
      ctxOriginal.textBaseline = 'top';
      ctxOriginal.font = "100px Arial"
      ctxOriginal.fillStyle = '#ffffff'
      // ctxOriginal.fillText("Joe", 10, 10);
      img.style.display = 'none';
      let originalImageData = ctxOriginal.getImageData(0, 0, canvasOringinal.width, canvasOringinal.height)
      let originalData = originalImageData.data;

      changeSliderValue(this, originalData, that)
    }

    function changeSliderValue(img, originalData, that) {
      let canvas = document.getElementById('myCanvas');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = '#ffffff'
      // ctx.fillText("Joe", 10, 10);
      img.style.display = 'none';
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imageData.data;
      let textToPaint = "Joe"



      let sliderR = document.getElementById('1');

      let changeRChannel = () => {
        // console.log(sliderR.valueAsNumber)
        let sliderValue8Bit = sliderR.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i] = Math.round(originalData[i] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(textToPaint, 10, 10);
      }

      let sliderG = document.getElementById('2');

      let changeGChannel = () => {
        // console.log(sliderG.valueAsNumber)
        let sliderValue8Bit = sliderG.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i + 1] = Math.round(originalData[i + 1] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(textToPaint, 10, 10);
      }

      let sliderB = document.getElementById('3');

      let changeBChannel = () => {
        // console.log(sliderB.valueAsNumber)
        let sliderValue8Bit = sliderB.valueAsNumber/255
        let i
        for (i = 0; i < data.length; i += 4) {
          data[i + 2] = Math.round(originalData[i + 2] * sliderValue8Bit)
        }
        ctx.textBaseline = 'top';
        ctx.font = "100px Arial"
        ctx.putImageData(imageData, 0, 0)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(textToPaint, 10, 10);
      }

      sliderR.addEventListener('input',changeRChannel);
      sliderG.addEventListener('input',changeGChannel);
      sliderB.addEventListener('input',changeBChannel);





      // let sliderR = document.getElementById('1');
      // let sliderG = document.getElementById('2');
      // let sliderB = document.getElementById('3');
      //
      // let changeSliderValue = (id_number) => {
      //   // console.log(sliderB.valueAsNumber)
      //   let sliderValue8Bit = sliderB.valueAsNumber/255
      //   let i
      //   for (i = 0; i < data.length; i += 4) {
      //     data[id_number] = Math.round(originalData[id_number] * sliderValue8Bit)
      //   }
      //   ctx.textBaseline = 'top';
      //   ctx.font = "100px Arial"
      //   ctx.putImageData(imageData, 0, 0)
      //   ctx.fillStyle = '#ffffff'
      //   ctx.fillText("Joe", 10, 10);
      // }
      //
      // let redWrapper = () => {
      //   changeSliderValue(1)
      // }
      //
      //
      //
      // sliderR.addEventListener('input', redWrapper);
      // sliderG.addEventListener('input',changeSliderValue(2));
      // sliderB.addEventListener('input',changeSliderValue(3));








      let uploadImage = (e) => {
        let currentCanvas = document.getElementById('myCanvas');
        let dataURL = currentCanvas.toDataURL()

        let upload_id = that.state.current_image.id
        let user_id = that.state.current_user.user_id

        let newBlob = dataURLtoBlob(dataURL)
        let lastSlashIndex = that.state.current_image.file.url.lastIndexOf("/")
        let originalFileName = that.state.current_image.file.url.substr(lastSlashIndex + 1, that.state.current_image.file.url.length)
        let file = new File([newBlob], `upload_id_${upload_id}_user_id_${user_id}_${originalFileName}`);

        let formPayLoad = new FormData();
        formPayLoad.append('share', file);


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

        let user_id = that.state.current_user.user_id
        let upload_id = that.state.current_image.id
        fetch(`/api/v1/users/${user_id}/uploads/${upload_id}/edits`,{
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ editorState: statePayLoad })
        })
        // .then(response => response.json())
        // .then(body => {
        //
        // })

        // that.setState({current_edit: sliderRValue})
      }

      let saveStateButton = document.getElementById('save-state-button')
      saveStateButton.addEventListener('click', saveEditorState)

    }
  }

  render(){
    return(
      <div>
        {/* <canvas id="myCanvas" width="300" height="227"/> */}
        <canvas id="myCanvas" width="500" height="500"/>
          <div>
            <SliderTile
              key = {1}
              id = {"1"}
              value = {"255"}
            />
          </div>
          <div>
            <SliderTile
              key = {2}
              id = {"2"}
              value = {"255"}
            />
          </div>
          <div>
            <SliderTile
              key = {3}
              id = {"3"}
              value = {"255"}
            />
            <div>
              <button id="upload-button">Upload image</button>
            </div>
            <div>
              <button id="save-state-button">Save edit</button>
            </div>
          </div>
          <h3>This is rendered in react</h3>
      </div>
    )
  }
}

export default ImageEditor
