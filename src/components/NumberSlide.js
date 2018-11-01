import React from "react";
import "./NumberSlide.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import NumberToMajor from "./NumberToMajor";
import PositionToPlace from "./PositionToPlace";

const majorSystem = {
  "00":"sosse",
  "01": "seide",
  "02": "sahne",
  "03": "Zaum", 
  "04": "Zar",
  "05": "Seil",
  "06": "Sushi",
  "07": "Socke",
  "08": "Seife",
  "09": "Suppe"
}


class NumberSlide extends React.Component {
  state = {
    position: 0,
    isLastSlide: false
  };



   getActiveNumber = _ => {
    const { digits, maxNumberLength } = this.props;
    const {position} = this.state

    const firstPosition = maxNumberLength * position;
    const lastPosition = firstPosition + maxNumberLength * 1;
    const number = digits.slice(firstPosition, lastPosition);

    return number;
  };

  getMaxPosition() {
    const { digits, maxNumberLength } = this.props;
    return Math.ceil(digits.length / maxNumberLength) - 1;
  }

  onNextNumber = () => {
    
    this.setState(currState => {
      const maxPosition = this.getMaxPosition();
      const newPosition =
        currState.position === maxPosition
          ? currState.position
          : currState.position + 1;

      const isLastSlide = currState.position === maxPosition ? true : false;

      return {
        position: newPosition,
        isLastSlide
      };
    });
  };

  onNumberBefore = () => {
    
    this.setState(currState => {
      const { position } = currState;
      const maxPosition = this.getMaxPosition();

      const newPosition =
        position > 0 ? position - 1 : position;
      const isLastSlide = (newPosition === maxPosition) ? true : false;

      return {
        position: newPosition,
        isLastSlide,
      };
    });
  };

  render() {
    const { children } = this.props;
    const { isLastSlide, position } = this.state;

    const maxPosition = this.getMaxPosition();
    const percentage = (position / maxPosition) * 100;
    const activeNumber = this.getActiveNumber(position);
    const Number = <NumberToMajor number={activeNumber}  numberToMajorObj={majorSystem}/>
    const Position = <PositionToPlace position={position+1} objectsInOnePlace={2} total={maxPosition+1}/>
    return (
      <div id="numberSlide">
        <div
          id="leftArrow"
          className="arrow"
          onClick={() => {
            this.onNumberBefore();
          }}
        >
          <img src="arrowLeft.svg" alt="arrowLeft" />
        </div>

        <div id="number">{isLastSlide ? children : Number }</div>

        <div
          id="rightArrow"
          className="arrow"
          onClick={() => {
            this.onNextNumber();
          }}
        >
          <img src="arrowRight.svg" alt="arrowRight" />
        </div>
        <div />
        <div id="indicator">
          <div id="position">
            {Position}
          </div>
          <LinearProgress variant="determinate" value={percentage} />
        </div>
      </div>
    );
  }
}

export default NumberSlide;
