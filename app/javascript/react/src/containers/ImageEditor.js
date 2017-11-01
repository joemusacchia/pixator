import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SliderTile from './components/SliderTile';
// import 'images/rhino.jpg'

class ImageEditor extends Component {
  constructor(props){
    super(props)
    this.state= {


    }


  }

  componentDidMount(){
    let img = new Image();
    img.src = 'https://s3.amazonaws.com/starcation-new-development/uploads/celestial/photo/1/Jupiter_and_its_shrunken_Great_Red_Spot.jpg';
    img.crossOrigin = "Anonymous";
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

    }
  }


  // shouldComponentUpdate(nextProps, nextState){
  //   return false;
  // }

  render(){
    return(
      <div>
        <canvas id="myCanvas" width="300" height="227"/>
          <div>
            <SliderTile
              key = {1}
              id = {"1"}
              value = {"255"}
            />
          </div>
          <div>
            <SliderTile
              key = {1}
              id = {"2"}
              value = {"255"}
            />
          </div>
          <div>
            <SliderTile
              key = {1}
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
