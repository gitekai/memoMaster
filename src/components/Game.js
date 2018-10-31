import React from "react";
import NumberSlide from "./NumberSlide";
import Button from "@material-ui/core/Button";
import Answer from "./Answer";
import Countdown from "./Counter";
import "./Game.css";

const NUMBER_LENGTH = 20;
const ANSWER_WAITING_TIME = 10;


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
    wantsToAnswer: false,
    hasWaitedToAnswer: false,
    answer: "",
  };

  startGame = () => {
    this.setState({
      gameStart: Date.now(),
      number: generateRandomNumber(NUMBER_LENGTH)
    });
  };

  wantsToAnswer = async () => {
    this.setState({ wantsToAnswer: true });
  };

  onAnswerInputChange = val => {
    this.setState({ answer: val });
  };

  onAnswerSubmit = () => {
    const { answer, number } = this.state;
    if (answer === number) {
      alert("you won");
    } else {
      alert("you loose");
    }
  };

  onCountDownEnd = (val) => {
    this.setState({ hasWaitedToAnswer : val })
  }

  render() {
    const { gameStart, number, wantsToAnswer, hasWaitedToAnswer } = this.state;

    if (gameStart === null) {
      return (
        <div id="mainContent">
          <Button variant="contained" onClick={this.startGame}>
            START
          </Button>
        </div>
      );
    }

    if (!wantsToAnswer) {
      return (
        <div id="mainContent">
          <NumberSlide digits={number} maxNumberLength={2}>
            <Button variant="contained" onClick={this.wantsToAnswer}>
              FINISHED ?¿
            </Button>
          </NumberSlide>
        </div>
      );
    }

    if (wantsToAnswer && ! hasWaitedToAnswer) {
      return (
        <div id="mainContent">
          <Countdown counter={ANSWER_WAITING_TIME} onCountdownEnd={this.onCountDownEnd} />
        </div>
      );
    }

    if(hasWaitedToAnswer){
      return (
        <div id="mainContent">
          <Answer
            onAnswer={this.onAnswerSubmit}
            onChange={this.onAnswerInputChange}
            value={this.state.answer}
          />
        </div>
      );
    }

  }
}

export default Game;
