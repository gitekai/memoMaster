import React from "react";
import { Link } from "react-router-dom";
import * as routes from "./constants/routes";
import SignOut from "./components/SignOut";
import AuthUserContext from './components/AuthUserContext';
import './Navigation.css';

const NavigationAuth = () => (
  <ul id="nav">
    <li>
      <Link to={routes.HOME}>HOME</Link>
    </li>
    <li>
      <Link to={routes.NUMBERGAME}>REMEMBER NUMBER GAME</Link>
    </li>
    <li>
      <Link to={routes.CONFIGURATION}>CONFIGURATION</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>ACCOUNT</Link>
    </li>
    <li>
      <Link to={routes.MAJORINPUTS}>Major inputs</Link>
    </li>
    <li>
      <SignOut />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul id="nav">
    <li>
      <Link to={routes.SIGNIN}>SIGN IN</Link>
    </li>
    <li>
      <Link to={routes.SIGNUP}>SIGN UP</Link>
    </li>
  </ul>
);

const Navigation = () => (
  <AuthUserContext.Consumer>
      {authUser => authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
  </AuthUserContext.Consumer>
);

export default Navigation;
