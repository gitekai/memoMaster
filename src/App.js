import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as routes from "./constants/routes";

import { firebase } from './firebase';
import Game from "./components/Game";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Configuration from "./components/Configuration";
import Navigation from "./Navigation";
import MajorInputs from "./components/MajorSystemInput";

class App extends React.Component {

  state = {
    authUser: null,
  }


  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser 
      ? this.setState({authUser,  })
      : this.setState({ authUser: null });
    })
  }

  render() {
    const {authUser} = this.state; 
    return (
      <Router>
        <div>
          <Navigation authUser={authUser}/>

          <hr />

          <Route exact path={routes.MAJORINPUTS} component={MajorInputs} />
          <Route exact path={routes.HOME} component={Game} />
          <Route exact path={routes.NUMBERGAME} component={Game} />
          <Route exact path={routes.SIGNIN} component={SignIn} />
          <Route exact path={routes.SIGNUP} component={SignUp} />
          <Route exact path={routes.ACCOUNT} component={Account} />
          <Route exact path={routes.CONFIGURATION} component={Configuration} />
        </div>
      </Router>
    );
  }
}

export default App;
