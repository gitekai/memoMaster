import React from "react";
import firebase from 'firebase';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

class MajorSystemInput extends React.Component {
  state = {
    actualCount: 130,
    inputs: {},
    database: null,
  };

  componentDidMount(){
  }

   onSubmit = () => {
  }

  addCount = () => {
    this.setState(currState => ({ actualCount: currState.actualCount + 1 }));
  };

  onInputChange = (event, displayNumber) => {
    const value = event.target.value;

    this.setState(currVal => {
      return { inputs: { ...currVal.inputs, [displayNumber]: value } };
    });
  };
  onInputEnter = e => {
    if (e.key === "Enter") {
      this.setState(currVal => {
        return {
          actualCount: currVal.actualCount + 1
        };
      });
    }
  };

  getInputArray() {
    const { actualCount } = this.state;

    const elementArray = [];
    for (
      let currentDisplayName = "0", i = 0;
      i <= actualCount;
      i++, currentDisplayName = returnNextCount(currentDisplayName)
    ) {
      const element =
        i === actualCount ? (
          <TextField
            variant="filled"
            key={currentDisplayName}
            type="text"
            autoFocus={true}
            onKeyUp={e => this.onInputEnter(e)}
            onBlur={e => this.onInputChange(e, currentDisplayName, true)}
            value={this.state.inputs[currentDisplayName]}
            InputProps={{
              startAdornment: (
                <InputAdornment variant="filled" position="start">
                  {currentDisplayName}
                </InputAdornment>
              )
            }}
          />
        ) : (
          <TextField
            variant="filled"
            key={currentDisplayName}
            type="text"
            onBlur={e => this.onInputChange(e, currentDisplayName)}
            value={this.state.inputs[currentDisplayName]}
            InputProps={{
              startAdornment: (
                <InputAdornment variant="filled" position="start">
                  {currentDisplayName}
                </InputAdornment>
              )
            }}
          />
        );
      elementArray.push(element);
    }

    return elementArray;
  }

  render() {
    return (
      <div id="majorSystemInput">
        <div id="inputs">{this.getInputArray()}</div>
        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          Submit that shit
        </Button>
      </div>
    );
  }
}

function returnNextCount(countActual) {
  const strCountActual = "" + countActual;
  const allNines = /^[9]+$/.test("" + strCountActual);
  if (allNines) {
    return "0".repeat(strCountActual.length + 1);
  } else {
    const zeros = strCountActual.match(/^[0]+/)
      ? `${strCountActual.match(/^[0]+/)}`
      : "";
    const digits = strCountActual.replace(/^[0]+/, "");
    const nextNumber = `${1 * digits + 1}`;

    if (nextNumber.length > digits.length) {
      return `${zeros.substring(1)}${nextNumber}`;
    }
    return `${zeros}${nextNumber}`;
  }
}

export default MajorSystemInput;
