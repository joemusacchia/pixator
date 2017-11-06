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

  // // get initial state before the page renders via GET/fetch
  // componentWillMount(){
  //   let that = this;
  //   let user_id = this.props.params.user_id;
  //   let id = this.props.params.id;
  //   fetch(`/users/${user_id}/uploads/${id}.json`, {
  //     credentials: 'same-origin',
  //     method: 'GET',
  //     headers: { 'Content-Type':'application/json'}
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       let errorMessage = `${response.status} (${response.statusText})`,
  //       error = new Error(errorMessage);
  //       throw(error);
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(body => {
  //     // debugger
  //     that.setState({
  //       current_user: body.current_user,
  //       current_image: body.clicked_image,
  //       current_edit: body.specific_edit
  //
  //     })
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

  // page will only render on page load
  shouldComponentUpdate(){
    return false
  }

  componentDidMount(){

    // if (Object.keys(this.state.current_image).length != 0) {
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
        ctxOriginal.fillText("Joe", 10, 10);
        img.style.display = 'none';
        let originalImageData = ctxOriginal.getImageData(0, 0, canvasOringinal.width, canvasOringinal.height)
        let originalData = originalImageData.data;

        changeSliderValue(this, originalData)
      }

      function changeSliderValue(img, originalData) {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#ffffff'
        ctx.fillText("Joe", 10, 10);
        img.style.display = 'none';
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let data = imageData.data;

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
          ctx.fillText("Joe", 10, 10);
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
          ctx.fillText("Joe", 10, 10);
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
          ctx.fillText("Joe", 10, 10);
        }

        sliderR.addEventListener('input',changeRChannel);
        sliderG.addEventListener('input',changeGChannel);
        sliderB.addEventListener('input',changeBChannel);








        let uploadImage = (e) => {
          // debugger
          let currentCanvas = document.getElementById('myCanvas');
          let dataURL = currentCanvas.toDataURL()

          let newBlob = dataURLtoBlob(dataURL)
          let file = new File([newBlob], "editedImage_1.png");

          let formPayLoad = new FormData();
          formPayLoad.append('file', file);

          fetch(`/api/v1/users/${1}/images`, {
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
      }
    }
  // }


  // shouldComponentUpdate(nextProps, nextState){
  //   return false;
  // }

  render(){
    return(
      <div>
        {/* <canvas id="myCanvas" width="300" height="227"/> */}
        <canvas id="myCanvas" width="500" height="500"/>
        <div>
          <button id="upload-button">Upload image</button>
        </div>
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
          </div>
          <h3>This is rendered in react</h3>
      </div>
    )
  }
}

export default ImageEditor
