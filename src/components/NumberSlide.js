import React from "react";
import "./NumberSlide.css";
import LinearProgress from "@material-ui/core/LinearProgress";

function getPercentage(currentStep, stepsTotal) {
  const percentage = Math.round(((currentStep + 1) / (stepsTotal - 1)) * 100);
  console.log(`${currentStep} / ${stepsTotal - 1} * 100 = ${percentage}`);
  return percentage < 100 ? percentage : 100;
}

class NumberSlide extends React.Component {
  state = {
    position: 0,
    percentage: 0,
    levelPassed: false
  };

  showNumberPart = () => {
    const { digits, maxNumberLength } = this.props;
    const { position } = this.state;

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
    const maxPosition = this.getMaxPosition();

    this.setState(currState => {
      const newPosition =
        currState.position === maxPosition
          ? currState.position
          : currState.position + 1;
      const percentage = (newPosition / maxPosition) * 100;
      const levelPassed = currState.position === maxPosition ? true : false;

      return {
        position: newPosition,
        percentage,
        levelPassed
      };
    });
  };

  onNumberBefore = () => {
    const maxPosition = this.getMaxPosition();

    this.setState(currState => {
      const { position } = currState;
      const newPosition =
        position > 0 && !currState.levelPassed ? position - 1 : position;
      const percentage = (newPosition / maxPosition) * 100;

      return {
        position: newPosition,
        percentage,
        levelPassed: false
      };
    });
  };

  render() {
    const { children } = this.props;
    const { percentage, levelPassed } = this.state;

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

        <div id="number">
          {levelPassed ? children : this.showNumberPart()}
        </div>

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
          <LinearProgress variant="determinate" value={percentage} />
        </div>
      </div>
    );
  }
}

export default NumberSlide;
