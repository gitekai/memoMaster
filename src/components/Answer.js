import React from "react";
import TextField from "@material-ui/core/TextField";
import GroupedNumbers from "./GroupedNumbers";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import "./Answer.css";

class Answer extends React.Component {
  state = {
    inputVal: "",
    activeIndex: 0,
  };

  componentDidUpdate(){
    if(this.activeInput){
      this.activeInput.focus();
    }
  }

  onActiveIndexChange = val => {
    this.setState({ activeIndex: val });
  };

  onInputChange = e => {
    const { maxNumLength, digitsTotal } = this.props;
    const inputVal = e.target.value;

     this.setState(
       currState => {
         let newInput = inputVal;
         let newActiveIndex = currState.activeIndex;
        
        if (inputVal.length === maxNumLength) {
          newInput = "";
          newActiveIndex = (currState.activeIndex + 1) % (digitsTotal / maxNumLength);
        }

        return {
          inputVal: newInput,
          activeIndex: newActiveIndex
        };
      },
      this.props.onAnswerChange(inputVal,this.state.activeIndex)
    );
  };

  onAnswerSubmit = () => {
    this.props.onAnswerSubmit();
  }

  render() {
    const { inputVal, answerGrouped, activeIndex } = this.state;
    const {answer} = this.props; 
    return (
      <div id="answer">
        <div id="answerGrouped">
          <GroupedNumbers
            answer={answer}
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
              onClick={this.onAnswerSubmit}
            >
              <DoneIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Answer;
