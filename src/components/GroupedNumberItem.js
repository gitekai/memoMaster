import React from 'react'; 
import './GroupedNumberItem.css'
function GroupNumberItem(props){

  const {number, position} = props; 

  return(
    <div id="groupedNumber">
      <div id="giposition">
        {position}
      </div>
      <div id="ginumber">
        {number}
      </div>
    </div>
  );
}

export default GroupNumberItem; 