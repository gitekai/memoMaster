import React from "react";
import NumberSlide from "./NumberSlide";
import Button from "@material-ui/core/Button";
import Answer from "./Answer";
import Countdown from "./Counter";
import Result from './Results';
import "./Game.css";

const DIGITS_TOTAL = 20;
const MAX_NUMBER_LENGTH = 2; 
const ANSWER_WAITING_TIME = 1;


function generateRandomNumber(desiredLength) {
  let number = "";
  for (let i = 0; i < desiredLength; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

class Game extends React.Component {
  state = {
    number: "",
    gameStart: null,
    gameEnd: null,
    wantsToAnswer: false,
    hasWaitedToAnswer: false,
    hasAnswered: false,
    answer: [],
  };

  startGame = () => {
    this.setState({
      gameStart: Date.now(),
      number: generateRandomNumber(DIGITS_TOTAL)
    });
  };

  wantsToAnswer = async () => {
    this.setState({ wantsToAnswer: true });
  };

  onAnswerChange = val => {
    this.setState({ answer: val });
  };

  onAnswerSubmit = () => {
    const { answer, number } = this.state;
    this.setState({gameEnd: Date.now(), hasAnswered: true});
  };

  onCountDownEnd = (val) => {
    this.setState({ hasWaitedToAnswer : val })
  }

  render() {
    const { gameStart, number, wantsToAnswer, hasWaitedToAnswer, answer, hasAnswered } = this.state;

    if (gameStart === null) {
      return (
        <div id="mainContent">
          <Button variant="contained" onClick={this.startGame}>
            START
          </Button>
        </div>
      );
    }

    if (!wantsToAnswer  && !hasAnswered) {
      return (
        <div id="mainContent">
          <NumberSlide digits={number} maxNumberLength={MAX_NUMBER_LENGTH}>
            <Button variant="contained" onClick={this.wantsToAnswer}>
              FINISHED ?¿
            </Button>
          </NumberSlide>
        </div>
      );
    }

    if (wantsToAnswer && ! hasWaitedToAnswer && !hasAnswered) {
      return (
        <div id="mainContent">
          <Countdown counter={ANSWER_WAITING_TIME} onCountdownEnd={this.onCountDownEnd} />
        </div>
      );
    }

    if(hasWaitedToAnswer && !hasAnswered){
      return (
        <div id="mainContent">
          <Answer
            onAnswerChange={this.onAnswerChange}
            onAnswerSubmit={this.onAnswerSubmit}
            maxNumLength={MAX_NUMBER_LENGTH}
            digitsTotal={DIGITS_TOTAL}
          />
        </div>
      );

    }
    if(hasAnswered){
      return <Result answer={answer} numberAsked={number} maxDigitLength={MAX_NUMBER_LENGTH} />
    }

  }
}

export default Game;
