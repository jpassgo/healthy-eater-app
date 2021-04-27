import { State } from '../config/store';
import React from 'react';
import {
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from '@material-ui/core';
import { connect } from 'react-redux';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Dispatch } from 'redux';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const NavigationDrawer = (navigationDrawerProps: NavigationDrawerProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isMenuOpen: false,
  });

  const isMenuOpen = false;

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, isMenuOpen: open });
  };

  const list = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Login', 'Account', 'Report Meal', 'Calorie Search'].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={'Menu'}>
        <Button onClick={toggleDrawer(true)}>Menu</Button>
        <SwipeableDrawer
          open={isMenuOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        ></SwipeableDrawer>
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
