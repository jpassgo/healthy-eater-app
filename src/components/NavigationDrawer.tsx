import { State } from "../config/store";
import React from "react";
import {
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from "@material-ui/core";
import { connect } from "react-redux";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const NavigationDrawer = (navigationDrawerProps: NavigationDrawerProps) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    isMenuOpen: false,
  });

  const routes = new Map([
    ["Home", "/"],
    ["Login", "/login"]
  ]);

  const redirect = (route: string): any  => {
    console.log(`route: ${route}`);
    console.log(`path: ${routes.get(route)}`);
    history.push(`${routes.get(route)}`);
  }

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, isMenuOpen: open });
  };

  return (
    <div>
      <React.Fragment key={"menu"}>
        <Button onClick={toggleDrawer(true)}>Menu</Button>
        <SwipeableDrawer
          open={state["isMenuOpen"]}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {["Home", "Account", "Report Meal", "Calorie Search", "Login"].map(
                (text, index) => (                    
                      <ListItem button key={text} onClick={() => redirect(text)}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>                  
                )
              )}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

interface NavigationDrawerProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: State): NavigationDrawerProps => {
  return ({
    isAuthenticated: state.applicationState.isAuthenticated,
  } as unknown) as NavigationDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return ({} as unknown) as NavigationDrawerProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
