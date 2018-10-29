import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import './Answer.css'; 

class Answer extends React.Component {

  onInputChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { value, onAnswer } = this.props;
    return (
      <div id="answer">
        <div id="answerInput">
        <TextField
          className="materialTextField"
          label="Answer"
          onChange={this.onInputChange}
          value={value}
        />
        </div>
      <Button className="answerButton" variant="contained" onClick={onAnswer}>Submit answer</Button>
      </div>
    );
  }
}

export default Answer;
