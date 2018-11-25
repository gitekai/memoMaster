import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthUserContext from "./AuthUserContext";
import withAuthorization from "./withAuthorization";
import withMajorNumbers from "./withMajorNumber";
import { database } from "../firebase";
import ReactDOM from "react-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SaveIcon from '@material-ui/icons/Save'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import "./MajorSystem.css";

const initialState = majorNumberLength => {
  const retObj = {};
  const startPos = "0".repeat(majorNumberLength);
  for (
    let i = startPos;
    i.length === majorNumberLength;
    i = returnNextCount(i)
  ) {
    retObj[i] = "";
  }
  return { ...retObj };
};

const initialMajorSize = 2;
class MajorSystemInputs extends React.Component {
  state = {
    inputs : initialState(initialMajorSize),
    majorNumberLength: initialMajorSize,
    actualFocusItem: null,
    focusRef: {},
    snackbarOpen: false,
  };

  onSnackbarClose = () => {
    this.setState({snackbarOpen:false})
  }


  onFocus = newIndex => {
    this.setState({
      actualFocusItem: newIndex
    });
  };

  componentDidUpdate() {
    const actualFocus = this.state.actualFocusItem;
    if (!actualFocus) {
      return;
    }
    this.state.focusRef[this.state.actualFocusItem].focus();
  }

  onSubmit = authUser => {
    const { inputs } = this.state;
    database.doCreateMayorSystem(authUser.uid, inputs)
    .then(noseque => { this.setState({snackbarOpen: true})});
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.majorSystem) {
      return;
    }

    this.setState({ inputs: nextProps.majorSystem });
  }

  onInputChange = (event, displayNumber) => {
    const value = event.target.value;
    const focusRef = this.state.focusRef;

    const activeKey = Object.keys(focusRef).filter(
      ref => document.activeElement === ReactDOM.findDOMNode(focusRef[ref])
    );

    this.setState(currVal => {
      const nextItem = returnNextCount(activeKey)
      const focusItem = /\s+$/.test(value) && nextItem.length === currVal.majorNumberLength
        ? nextItem
        : activeKey;
      return {
        inputs: { ...currVal.inputs, [displayNumber]: value },
        actualFocusItem: focusItem
      };
    });
  };

  setFocus = (ref, obj) => {
    this.setState(currState => {
      const refObj = currState.focusRef;
      return { focusRef: { ...refObj, [obj]: ref } };
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ majorNumberLength: value, actualFocusItem: null });
  };

  getInputArray() {
    const { majorNumberLength, inputs } = this.state;

    const elementArray = [];
    const startPos = "0".repeat(majorNumberLength);
    for (
      let i = startPos, count = 0;
      i.length === majorNumberLength;
      i = returnNextCount(i), count++
    ) {
      const className = (count + 1) % 10 === 0 ? "extraSpace" : "";
      const element = (
        <div className={`majorInputItem ${className}`}>
          <TextField
            fullWidth
            className={className}
            inputRef={ref => {
              this.setFocus(ref, i);
            }}
            variant="outlined"
            type="text"
            label={i}
            key={i}
            onChange={event => this.onInputChange(event, i)}
            value={inputs[i]}
          />
        </div>
      );

      elementArray.push(element);
    }

    return elementArray;
  }

  render() {
    const { majorNumberLength, snackbarOpen } = this.state;
    return (
      <div id="majorSystemInput">
      <div id="majorLengthTabs">
      <Tabs value={majorNumberLength} onChange={this.handleTabChange}>
            <Tab label="1 Digit Pegs" value={1}/>
            <Tab label="2 Digit Pegs" value={2}/>
            <Tab label="3 Digit Pegs" value={3}/>
       </Tabs>
       </div>

        <div id="inputs">{this.getInputArray()}</div>
        <SnackAlert openVal={snackbarOpen} closeHandler={this.onSnackbarClose} />
        <AuthUserContext.Consumer>
          {authUser => (
            <div id="fab">
            <Button
              variant="fab"
              color="primary"
              onClick={() => {
                this.onSubmit(authUser);
              }}
            >
              <SaveIcon />
            </Button>
            </div>
          )}
        </AuthUserContext.Consumer>
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

const SnackAlert = ({openVal,closeHandler}) => 
<Snackbar
anchorOrigin={{
  vertical: "bottom",
  horizontal: "left"
}}
open={openVal}
onClose={closeHandler}
autoHideDuration={6000}
ContentProps={{
  "aria-describedby": "message-id"
}}
message={<span id="message-id">MajorSystem Saved succesfully</span>}
/>

const majorNumberInputElement = withMajorNumbers(MajorSystemInputs);
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(majorNumberInputElement);
