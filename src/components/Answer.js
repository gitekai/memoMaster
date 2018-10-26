import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import './Answer.css'; 

class Answer extends React.Component {

  onInputChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { value, placeholder, onAnswer } = this.props;
    return (
      <div id="answer">
        <TextField
          placeholder={placeholder}
          onChange={this.onInputChange}
          value={value}
        />
      <Button variant="contained" onClick={onAnswer}>Submit answer</Button>
      </div>
    );
  }
}

export default Answer;
