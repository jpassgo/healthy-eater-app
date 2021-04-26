import { State } from "../config/store";
import React from "react";
import classes from "*.module.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { connect } from "http2";
import MenuIcon from "@material-ui/icons/Menu";
import { Dispatch } from "redux";

const NavigationBar = (navigationBarProps: NavigationBarProps) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

interface NavigationBarProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: State): NavigationBarProps => {
    return(
        {
            isAuthenticated: state.applicationState.isAuthenticated,
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return(
       {} as unknown
    ) as NavigationBarProps;
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
