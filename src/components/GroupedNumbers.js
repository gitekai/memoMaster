import React from "react";
import NumberItem from './GroupedNumberItem';
import './GroupedNumbers.css';

class GroupedNumber extends React.Component {

  produceNumberArray() {
    const { answer = [] } = this.props;

    return answer.map((answer, idx, arr) => (idx === arr.length-1 ) 
  ? <NumberItem isActive={true} number={answer} position={idx + 1} />
    :<NumberItem isActive={false} number={answer} position={idx + 1} />)
  }
  /* 

   const res = [];
   
   for(let i=0, maxIndex=0;maxIndex < answer.length ;i++){
     const partialString = answer.slice(maxIndex,maxIndex+maxNumber); 
     res.push( <div className="item"><NumberItem number={partialString} position={i+1}/></div>)
     maxIndex += maxNumber;
   }
   return res; 

 }*/

  render() {
    const numbers = this.produceNumberArray();

    return (
      <div id="groupedNumbers">
        {numbers}
      </div>
    );
  }
}

export default GroupedNumber;
