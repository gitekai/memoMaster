import React from "react";
import TextField from "@material-ui/core/TextField";
import GroupedNumbers from "./GroupedNumbers";
import Button from "@material-ui/core/Button";
import "./Answer.css";

class AnswerII extends React.Component {
  state = {
    inputVal: '',
    answerGrouped: [],
    activeIndex: 0
  };

  componentDidMount = () => {
    this.setState({answerGrouped: this.initiateAnswerGroups()});
  }

  initiateAnswerGroups = () => {
    const { maxNumLength=1, numLength=1 } = this.props;

    let countTotal = 0;
    const initialArray = [];

    while (countTotal < numLength) {
      let placeHolder = "";
      for (let i = 0; i < maxNumLength && countTotal < numLength; i++) {
        placeHolder += "X";
        countTotal++;
      }
      initialArray.push(placeHolder);
    }

    return initialArray;
  }

  onActiveIndexChange = val => {
    this.setState({ activeIndex: val });
  };

  onInputChange = e => {
    const { maxNumLength, numLength } = this.props;
    const { activeIndex } = this.state;

    const maxIndex = Math.ceil(numLength / maxNumLength) ;

    const value = e.target.value;

    if (value.length === maxNumLength) {
      this.setState(
        currState => {
          const currAnswers = currState.answerGrouped;

          const updateAnswer = (index, value) => {
            return currAnswers.map((answer, idx) => {
              if (idx === index) {
                return value;
              } else {
                return answer;
              }
            });
          };
          const answerGrouped = updateAnswer(activeIndex, value);

          //const answerGrouped={...currState.answerGrouped, [Object.keys(currState.answerGrouped).length]: value };
          return {
            answerGrouped,
            inputVal: "",
            activeIndex: activeIndex + 1 < maxIndex ? activeIndex + 1 : 0
          };
        },
        () => {
          this.props.onAnswerChange(
            `${this.state.answerGrouped.join("")}${
              this.state.inputVal.length > 0 ? this.state.inputVal : ""
            }`
          );
        }
      );
      return null;
    }
    this.setState({ inputVal: value }, () => {
      this.props.onAnswerChange(
        `${this.state.answerGrouped.join("")}${this.state.inputVal}`
      );
    });
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
            type="number"
            multiline={true}
            className="materialTextField"
            label="Answer"
            onChange={this.onInputChange}
            value={inputVal}
          />
          <div id="answerButton">
            <Button
              className="answerButton"
              variant="contained"
              onClick={onAnswerSubmit}
            >
              Submit answer
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerII;
