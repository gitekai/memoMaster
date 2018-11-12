import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import AuthUserContext from './AuthUserContext';
import FormControl from '@material-ui/core/FormControl';
import './MajorSystem.css';


import { auth, database } from '../firebase';
import withMajorNumber from './withMajorNumber'; 

class MajorSystemInputs extends React.Component {
  static contextType = AuthUserContext;
  state = {
    inputs: {},
    majorNumberLength: 1,
  };

  componentDidMount() {
    database.onceGetMajorSystem().then(snapshot => {
      const a = snapshot.val()
      const firstID = Object.keys(a)[0]
      const majorSystem = a[firstID];
      this.setState({ inputs: majorSystem })
    });

  }

  onSubmit = (authUser) => {
    const { inputs } = this.state;
    console.log(authUser.uid)
    database.doCreateMayorSystem(authUser.uid, inputs);
  }

  onSelectChange = (value) => {
    this.setState({
      majorNumberLength: value
    });
  }

  onInputChange = (event, displayNumber) => {
    const value = event.target.value;

    this.setState(currVal => {
      return { inputs: { ...currVal.inputs, [displayNumber]: value } };
    });
  };

  getInputArray() {
    const { inputs, majorNumberLength, activeFocus } = this.state;

    const elementArray = [];
    const startPos = '0'.repeat(majorNumberLength);
    for (let i = startPos,count=0; i.length === majorNumberLength; i = returnNextCount(i),count++) {
      const className = ( (count + 1) % 10 == 0 ) ? 'extraSpace' : ''
      const element = <Input pos={i} value={inputs[i]} onChange={event => this.onInputChange(event, i)} cl={className}/>
      elementArray.push(element);
    }

    return elementArray;
  }

  render() {
    const { majorNumberLength } = this.state;
    return (
      <div id="majorSystemInput">
        <LengthSelect value={majorNumberLength} handleChange={(event) => this.onSelectChange(event.target.value)} />
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


const Input = ({ pos, value, onChange, cl}) => {
  return (
    <div className={`majorInputItem ${cl}`}>
    <TextField
      className={cl}
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
  <FormControl variant="outlined">
    <InputLabel htmlFor="outlined-age-simple">age</InputLabel>
    <Select
      value={value}
      onChange={handleChange}
      input={
        <OutlinedInput
          labelWidth={10}
          name="age"
          id="outlined-age-simple"
        />
      }
    >
      <MenuItem value={1}> One </MenuItem>
      <MenuItem value={2}> Two </MenuItem>
    </Select>
  </FormControl>


export default MajorSystemInputs;
