import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { auth } from '../firebase';
import {withRouter} from 'react-router-dom';
import * as routes  from '../constants/routes';
import {SignUpLink} from './SignUp';

const SignIn = ({history}) => (
  <div>
    <SignInPage history={history}/>
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInPage extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  onChange = (inputID, value) => {
    this.setState({
      [inputID]: value
    });
  };

  onSubmit = (event) => {
    const {email, password} = this.state; 
    const {history} = this.props; 

    auth.doSignInWithEmailAndPassword(email, password)
    .then(authUser => {
      this.setState({...INITIAL_STATE}); 
      history.push(routes.HOME);  
    })
    .catch(error => {
      this.setState({error});
    })

  }

  render() {
    const {email, password, error} = this.state;
    const enableButton = email && password ; 

    return (
      <form>
        <TextField
          variant="outlined"
          label="email"
          onChange={event => {
            this.onChange("email", event.target.value);
          }}
          value={email}
        />
        <TextField
          variant="outlined"
          label="password"
          type="password"
          onChange={event => {
            this.onChange("password", event.target.value);
          }}
          value={password}
        />
        <Button disabled={!enableButton} variant="contained" onClick={this.onSubmit} >Sing IN</Button>

        {error && <p>ERROR: {error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignIn);
