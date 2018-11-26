import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as routes from "./constants/routes";

import Home from './components/Home'
import Game from "./components/Game";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Configuration from "./components/Configuration";
import Navigation from "./Navigation";
import MajorInputs from "./components/MajorSystemInput";
import withAuthentication from "./components/withAuthentication";
import Drawer from "@material-ui/core/Drawer";
import TopAppBar from './components/materialUI/TopAppBar';
import './App.css';
import Result from './components/Results';

//  const App = () => {
//    return <Result answerArr={[22,33,44]} numberAsked={123345} maxDigitLength={2}/>
//  }


class App extends React.Component {

  state={
    drawerOpened: false
  }

  toggleDrawer = () => {
    this.setState(currState => {
      return {drawerOpened: !currState.drawerOpened}
    })
  }

  closeDrawer = () => {
    this.setState({drawerOpened: false})
  }

  render() {
    return (
      <Router>
        <div id="app">
          <TopAppBar toggleDrawer={this.toggleDrawer}/>
          <Drawer anchor="left" open={this.state.drawerOpened} onClose={this.closeDrawer}>
          <Navigation />
          </Drawer>

          <Route exact path={routes.MAJORINPUTS} component={MajorInputs} />
          <Route exact path={routes.HOME} component={Home} />
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

export default withAuthentication(App);
