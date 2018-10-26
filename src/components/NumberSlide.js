import React from 'react'
import './NumberSlide.css';
import LinearProgress from '@material-ui/core/LinearProgress';


function getPercentage(currentStep, stepsTotal) {
    const percentage = Math.round((currentStep + 1) / (stepsTotal - 1) * 100);
    console.log(`${currentStep} / ${stepsTotal - 1} * 100 = ${percentage}`)
    return (percentage < 100) ? percentage : 100;
}

class NumberSlide extends React.Component {

    state = {
        position: 0,
        hasReachedEnd: false,
        percentage: 0,
        levelPassed: false,
    }

    showNumberPart = () => {
        const { digits, maxNumberLength, children } = this.props;
        const { position } = this.state;

        const firstPosition = maxNumberLength * position;
        const lastPosition = firstPosition + maxNumberLength * 1;
        const number = digits.slice(firstPosition, lastPosition);

        return number;
    }

    onNextNumber = () => {

        this.setState(currState => {
            const { digits, maxNumberLength } = this.props;
            const maxPosition = Math.ceil(digits.length / maxNumberLength) - 1;
            const newPosition = (currState.position === maxPosition) ? currState.position : currState.position + 1;
            const percentage = (newPosition / maxPosition * 100);
            const levelPassed = (currState.position === maxPosition) ? true : false;
            let isLast = false;
            if (newPosition === maxPosition) {
                isLast = true;
            }

            return { position: newPosition, hasReachedEnd: isLast, percentage, levelPassed, }
        });
    }

    onNumberBefore = () => {
        this.setState(currState => {
            const { digits, maxNumberLength } = this.props;
            const maxPosition = Math.ceil(digits.length / maxNumberLength) - 1;
            const { position } = currState;
            const newPosition = (position > 0 && ! currState.levelPassed) ? position - 1 : position;
            const percentage = (newPosition / maxPosition * 100)

            let isLast = false;
            if (newPosition === maxPosition) {
                isLast = true;
            }

            return { position: newPosition, hasReachedEnd: isLast, percentage, levelPassed:false }
        })
    }

    render() {
        const { digits, maxNumberLength = 1, children } = this.props;
        const { percentage, levelPassed } = this.state
        const maxPosition = Number.parseInt(digits.length / maxNumberLength) - 1

        return (
            <div id="numberSlide">
                <div id="leftArrow" className="arrow" onClick={() => { this.onNumberBefore() }}>
                    <img src="arrowLeft.svg" alt="arrowLeft" />
                </div>
                {
                    levelPassed ? children :
                        <div id="number">{this.showNumberPart(maxPosition)} </div>
                }
                <div id="rightArrow" className="arrow" onClick={() => { this.onNextNumber() }}>
                    <img src="arrowRight.svg" alt="arrowRight" />
                </div>
                <div></div>
                <div id="indicator">
                    <LinearProgress variant="determinate" value={percentage} />
                </div>
            </div>
        )
    }
}

export default NumberSlide;