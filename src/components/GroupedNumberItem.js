import React from 'react'; 
import './GroupedNumberItem.css';


function GroupNumberItem(props){

  const {position, isActive,solutionNumber,className, children} = props; 
  const loosingNumberClass = (solutionNumber)? 'loose' : '';
  const cl = (isActive) ? 'isActive' : 'nonActive';

  return(
    <div id="groupedNumber" onClick={props.onSelect}>
      <div id="giposition" className={`${className} ${cl}`}>
        {position}
      </div>
      <div id="ginumber">
        <div className={`numberItem ${loosingNumberClass}`}>
        {children}
        </div>
        <div className={'numberItem win'}>
        {solutionNumber}
        </div>
      </div>
    </div>
  );
}

export default GroupNumberItem; 