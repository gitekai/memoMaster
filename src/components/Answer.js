import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NumberGroup from "./GroupedNumbers";

import "./Answer.css";

class Answer extends React.Component {
  onInputChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value, onAnswer } = this.props;
    return (
      <div id="answer">
        <div id="answerGrouped">
          <NumberGroup answer={value} maxNumber={2} />
        </div>
        <div id="answerInput">
          <TextField
            type="text"
            multiline={true}
            className="materialTextField"
            label="Answer"
            onChange={this.onInputChange}
            value={value}
          />
          <div id="answerButton">
        <Button className="answerButton" variant="contained" onClick={onAnswer}>
          Submit answer
        </Button>
        </div>
        </div>

      </div>
    );
  }
}

export default Answer;
