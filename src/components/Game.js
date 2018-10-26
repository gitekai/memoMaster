import React from "react";
import NumberSlide from "./NumberSlide";
import Button from '@material-ui/core/Button';
import Answer from './Answer';


const NUMBER_LENGTH=4;
const ANSWER_WAITING_TIME=2;

function timeOut(interval){
  return new Promise((resolve) => {
    setTimeout(()=>{ return resolve()}, interval * 1000);
  })  
}

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
    answer: '',
    displayedNumber: '',
  };

  startGame = () => {
    this.setState({
      gameStart: Date.now(),
      number: generateRandomNumber(NUMBER_LENGTH)
    });
  };

  setDisplayedNumber = (val) => {
    this.setState({displayedNumber : val })
  }

  wantsToAnswer = async () => {
      await timeOut(ANSWER_WAITING_TIME); 
      this.setState({wantsToAnswer: true})
  }

  onAnswerInputChange = (val) => {
    this.setState({answer: val})
  }

  onAnswerSubmit = () => {
    const {answer , number} = this.state; 
    if( answer === number ){
      alert("you won")
    } else {
      alert("you loose")
    }
  }

  render() {
    const { gameStart, number, wantsToAnswer } = this.state;

    if(gameStart === null ){
      return(
        <Button variant="contained" onClick={this.startGame}>START</Button>
      );
    } 

    if (!wantsToAnswer ){
      return(
        <NumberSlide digits={number} maxNumberLength={2} >
            <Button variant="contained" onClick={this.wantsToAnswer}>FINISHED ?¿</Button>
          </NumberSlide>
      );
    }

    return (
      <Answer onAnswer={this.onAnswerSubmit} onChange={this.onAnswerInputChange} value={this.answer}/>
    );

   
  }
}

export default Game;
