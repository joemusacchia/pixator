import React from 'react';

const SliderTile = (props) => {
  return(
      <input type="range" id={props.id} min="0" max="255" step="1" defaultValue={props.value}/>
  )
}

export default SliderTile
