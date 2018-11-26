import React from "react";
import NumberSlide from "./NumberSlide";
import Button from "@material-ui/core/Button";
import Answer from "./Answer";
import Countdown from "./Counter";
import Result from "./Results";
import "./Game.css";
import TextField from "@material-ui/core/TextField";
import NextIcon from '@material-ui/icons/NavigateNext';

const DIGITS_TOTAL = 10;
const MAX_NUMBER_LENGTH = 2;
const ANSWER_WAITING_TIME = 1;
const PLACEHOLDER = "X";

const generateRandomNumber = desiredLength => {
  let number = "";
  for (let i = 0; i < desiredLength; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

const initiateAnswerArray = (totalDigits, maxNumLength, placeHolderSymbol) => {
  const devidabel = Number.parseInt(totalDigits / maxNumLength);

  const placeholderArray = new Array(devidabel).fill(
    placeHolderSymbol.repeat(maxNumLength)
  );
  const rest =
    totalDigits % maxNumLength !== 0
      ? placeHolderSymbol.repeat(totalDigits % maxNumLength)
      : null;

  return rest ? [...placeholderArray, rest] : [...placeholderArray];
};

const gameStates = {
  PREPARATION: 0,
  MEMORIZATION: 1,
  WAIT_FOR_RECALL: 2,
  RECALL: 3,
  SHOW_RESULTS: 4
};

class Game extends React.Component {
  state = {
    digitsTotal: 10,
    number: "",
    answer: [],

    gameState: gameStates.PREPARATION,

    memorizationStart: null,
    memorizationEnd: null,

    recallStart: null,
    recallEnd: null
  };

  startMemorization = () => {
    this.setState({
      memorizationStart: Date.now(),
      gameState: gameStates.MEMORIZATION,
      number: generateRandomNumber(this.state.digitsTotal),
      answer: initiateAnswerArray(
        this.state.digitsTotal,
        MAX_NUMBER_LENGTH,
        PLACEHOLDER
      )
    });
  };

  onAnswerChange = (val, itemIndex) => {
    this.setState(currState => {
      const answer = currState.answer
        .map((answerItem, idx) => {
          if (idx === itemIndex) {
            return val;
          }
          return answerItem;
        })
        .map(answerItem =>
          answerItem.length === 0
            ? PLACEHOLDER.repeat(MAX_NUMBER_LENGTH)
            : answerItem
        );

      return { answer };
    });
  };

  finishedMemorization = async () => {
    this.setState({
      memorizationEnd: Date.now(),
      gameState: gameStates.WAIT_FOR_RECALL
    });
  };

  onAnswerSubmit = () => {
    this.setState({
      recallEnd: Date.now(),
      gameState: gameStates.SHOW_RESULTS
    });
  };

  onCountDownEnd = val => {
    this.setState({
      recallStart: Date.now(),
      gameState: gameStates.RECALL
    });
  };

  numberLengthChange = val => {
    this.setState({
      digitsTotal: val
    });
  };

  render() {
    const {
      gameState,
      number,
      answer,
      memorizationStart,
      memorizationEnd,
      recallStart,
      recallEnd
    } = this.state;

    if (gameState === gameStates.PREPARATION) {
      return (
        <div id="mainContent">
          <TextField
            label="Number Length"
            variant="outlined"
            onChange={e => {
              this.numberLengthChange(e.target.value);
            }}
            value={this.state.digitsTotal}
            type="number"
          />
          <div id="fab">
          <Button color="primary" variant="fab" onClick={this.startMemorization}>
            <NextIcon />
          </Button>
          </div>
        </div>
      );
    }

    if (gameState === gameStates.MEMORIZATION) {
      return (
        <div id="mainContent">
          <NumberSlide digits={number} maxNumberLength={MAX_NUMBER_LENGTH}>
            <Button variant="contained" color="primary" onClick={this.finishedMemorization}>
              FINISHED ?¿
            </Button>
          </NumberSlide>
        </div>
      );
    }

    if (gameState === gameStates.WAIT_FOR_RECALL) {
      return (
        <div id="mainContent">
          <Countdown
            counter={ANSWER_WAITING_TIME}
            onCountdownEnd={this.onCountDownEnd}
          />
        </div>
      );
    }

    if (gameState === gameStates.RECALL) {
      return (
        <div id="mainContent">
          <Answer
            answer={this.state.answer}
            onAnswerChange={this.onAnswerChange}
            onAnswerSubmit={this.onAnswerSubmit}
            maxNumLength={MAX_NUMBER_LENGTH}
            digitsTotal={this.state.digitsTotal}
          />
        </div>
      );
    }
    if (gameState === gameStates.SHOW_RESULTS) {
      return (
        <Result
          numberAsked={number}
          answer={answer}
          maxDigitLength={MAX_NUMBER_LENGTH}
          timeTaken={{
            memorizationStart,
            memorizationEnd,
            recallStart,
            recallEnd
          }}
        />
      );
    }
  }
}

export default Game;
