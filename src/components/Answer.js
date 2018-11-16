import React from "react";
import TextField from "@material-ui/core/TextField";
import GroupedNumbers from "./GroupedNumbers";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import "./Answer.css";

class AnswerII extends React.Component {
  state = {
    inputVal: "",
    answerGrouped: [],
    activeIndex: 0,
  };

  componentDidMount = () => {
    this.setState(
      { answerGrouped: this.initiateAnswerGroups() });
  };

  componentDidUpdate(){
    if(this.activeInput){
      this.activeInput.focus();
    }
  }

  initiateAnswerGroups = () => {
    const { maxNumLength = 1, digitsTotal = 1 } = this.props;

    let countTotal = 0;
    const initialArray = [];

    while (countTotal < digitsTotal) {
      let placeHolder = "";
      for (let i = 0; i < maxNumLength && countTotal < digitsTotal; i++) {
        placeHolder += "X";
        countTotal++;
      }
      initialArray.push(placeHolder);
    }

    return initialArray;
  };

  onActiveIndexChange = val => {
    this.setState({ activeIndex: val });
  };

  onInputChange = e => {
    const { maxNumLength, digitsTotal } = this.props;
    const inputVal = e.target.value;

    this.setState(
      currState => {
        const currAnswers = currState.answerGrouped;
        let newInput = inputVal;
        let newActiveIndex = currState.activeIndex;
        
        const updateAnswer = (index, value) => {
          return currAnswers.map((answer, idx) => {
            if (idx === index) {
              return value;
            } else {
              return answer;
            }
          });
        };
        const answerGrouped = updateAnswer(newActiveIndex, newInput);
        
        if (inputVal.length === maxNumLength) {
          newInput = "";
          newActiveIndex = (currState.activeIndex + 1) % (digitsTotal / maxNumLength);
        }


        return {
          answerGrouped,
          inputVal: newInput,
          activeIndex: newActiveIndex
        };
      },
      () => {
        this.props.onAnswerChange(this.state.answerGrouped.join(""));
      }
    );
  };

  render() {
    const { inputVal, answerGrouped, activeIndex } = this.state;
    const { onAnswerSubmit } = this.props;
    return (
      <div id="answer">
        <div id="answerGrouped">
          <GroupedNumbers
            answer={answerGrouped}
            activeIndex={activeIndex}
            setActiveIndex={this.onActiveIndexChange}
          />
        </div>
        <div id="answerInput">
          <TextField
            className="materialTextField"
            type="number"
            label="Answer"
            onChange={this.onInputChange}
            variant="outlined"
            inputRef={ref => this.activeInput = ref }
            value={inputVal}
          />
          <div id="answerButton" className="fab">
            <Button
              className="answerButton"
              variant="fav"
              onClick={onAnswerSubmit}
            >
              <DoneIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerII;
