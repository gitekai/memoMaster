import React from 'react'; 
import './GroupedNumberItem.css';


function GroupNumberItem(props){

  const {number, position, isActive} = props; 
  const cl = (isActive) ? 'isActive' : 'nonActive';

  return(
    <div id="groupedNumber">
      <div id="giposition" className={cl}>
        {position}
      </div>
      <div id="ginumber">
        {number}
      </div>
    </div>
  );
}

export default GroupNumberItem; 