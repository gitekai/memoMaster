import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import withMajorNumbers from './withMajorNumber';
import { database } from '../firebase';
import './MajorSystem.css';



const initialState = (majorNumberLength) => {
  const retObj = {};
  const startPos = '0'.repeat(majorNumberLength);
  for (let i = startPos; i.length === majorNumberLength; i = returnNextCount(i)) {
    retObj[i]='';
  }
  return {...retObj}; 
}

class MajorSystemInputs extends React.Component {


  state = {
    inputs: initialState(2),
    majorNumberLength:2,
    actualFocus: 0,
  };

  onSubmit = (authUser) => {
    const { inputs } = this.state;
    database.doCreateMayorSystem(authUser.uid, inputs);
  }

  componentWillReceiveProps(nextProps){
    this.setState({ inputs: nextProps.majorSystem})
  }

  onRangeChange = (value) => {
    this.setState({
      majorNumberLength: 1*value
    });
  }


  onInputChange = (event, displayNumber) => {
    const value = event.target.value;
    this.setState(currVal => {
      const kk = (/\s+$/.test(value)) ? currVal.actualFocus + 1 : currVal.actualFocus;
      return { inputs: { ...currVal.inputs, [displayNumber]: value }, actualFocus: kk };
    });
  };

  getInputArray() {
    const { majorNumberLength, inputs, actualFocus } = this.state;

    const elementArray = [];
    const startPos = '0'.repeat(majorNumberLength);
    for (let i = startPos,count=0; i.length === majorNumberLength; i = returnNextCount(i),count++) {
      const className = ( (count + 1) % 10 === 0 ) ? 'extraSpace' : ''
      //const ref = (count===3) ? (ref) => { this.focused = ref} : null
      //<Input pos={i} value={inputs[i]} onChange={event => this.onInputChange(event, i)} cl={className} r={ref}/>
      const element = 
      <div className={`majorInputItem ${className}`}>
      {count === actualFocus 
    ? <TextField
      className={className}
      autoFocus
      variant="outlined"
      fullWidth
      type="text"
      label={i}
      key={i}
      onChange={event => this.onInputChange(event, i)}
      value={inputs[i]}
    /> 
    : <TextField
    className={className}
    variant="outlined"
    fullWidth
    type="text"
    label={i}
    key={i}
    onChange={event => this.onInputChange(event, i)}
    value={inputs[i]}
    />}
    </div>
    
    elementArray.push(element);
    }

    return elementArray;
  }

  render() {
    const { majorNumberLength } = this.state;
    return (
      <div id="majorSystemInput">
        <LengthSelect value={majorNumberLength} handleChange={(event) => this.onRangeChange(event.target.value)} />
        <div id="inputs">{this.getInputArray()}</div>
        <AuthUserContext.Consumer>
          {
            authUser =>
              <Button variant="contained" color="primary" onClick={() => { this.onSubmit(authUser) }}>
                Submit that shit
              </Button>
          }
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


const Input = ({ pos, value, onChange, cl, r }) => {
  return (
    <div className={`majorInputItem ${cl}`}>
    <TextField
      className={cl}
      ref={r}
      variant="outlined"
      fullWidth
      type="text"
      label={pos}
      key={pos}
      onChange={onChange}
      value={value}
    />
    </div>
  );
}

const LengthSelect = ({ value, handleChange }) =>
<div>
<input
type="range"
label="range"
min="1"
max="2"
step="1"
value={value}
onChange={handleChange}
/>
<datalist id="tickmarks">
  <option value="1" label="1" />
  <option value="2" label="2" />
</datalist>
</div>

const majorNumberInputElement = withMajorNumbers(MajorSystemInputs);
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(majorNumberInputElement);
