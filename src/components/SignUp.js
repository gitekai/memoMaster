import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import { auth, database} from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({history}) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history}/>
  </div>


  const INITIALSTATE = {
    username : '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: null,
  }

class SignUpForm extends Component {

  state = {
    ...INITIALSTATE,
  }

  onInputChange = (event, inputID) => {
    const inputValue = event.target.value; 
    this.setState({
      [inputID]: inputValue
    });
  }

  onSubmit = (event) => {
    const {
      email,
      password,
      username,
    } = this.state;

    const {
      history 
    } = this.props; 

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser)
        database.doCreateUser(authUser.user.uid,username,email )
        .then(dbUser => {
          this.setState({ ...INITIALSTATE });
          history.push(routes.HOME);
        })
        .catch(error => this.setState({error}))
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  }

  render() {
    const {username, email, password, passwordConfirm, error} = this.state;
    const isInvalid =
    password !== passwordConfirm ||
    password === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField 
          variant="outlined"
          label="Full Name"
          onChange={ (event) => { this.onInputChange(event,'username')} }
          value={username}
        />
                <TextField 
          variant="outlined"
          label="email"
          onChange={ (event) => { this.onInputChange(event,'email')} }
          value={email}
        />
                <TextField 
          variant="outlined"
          label="Password"
          type="password"
          onChange={ (event) => { this.onInputChange(event,'password')} }
          value={password}
        />
                <TextField 
          variant="outlined"
          label="Password Confirm"
          type="password"
          onChange={ (event) => { this.onInputChange(event,'passwordConfirm')} }
          value={passwordConfirm}
        />

        <Button disabled={isInvalid} variant="contained" color="primary" onClick={this.onSubmit} >Sign UP</Button>

        {error && <p>ERROR{error.message}</p>}
      </form>

      
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGNUP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};