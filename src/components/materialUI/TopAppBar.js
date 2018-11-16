import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from '@material-ui/core/styles';
import AuthUserContext from '../AuthUserContext';
import SignOut from "../SignOut";

const style = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const TopAppBar = ({ toggleDrawer,classes}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherited" aria-label="Menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <div className={classes.grow}></div>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
);


export default withStyles(style)(TopAppBar)