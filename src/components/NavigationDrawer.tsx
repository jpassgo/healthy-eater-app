/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Dispatch } from 'redux';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import { State } from '../config/store';
import { logout } from '../creators/login';
import HomeIcon from './HomeIcon';

const NavigationDrawer = (props: NavigationDrawerProps) => {
  const history = useHistory();

  const [state, setState] = React.useState({
    isMenuOpen: false,
  });

  const routes = new Map([
    ['Home', '/'],
    ['Login', '/login'],
    ['Create Account', '/create'],
    ['Report Meal', '/report'],
  ]);

  const links = ['Home', 'Account', 'Report Meal', 'Calorie Search', 'Login', 'Create Account'];

  if (props.isAuthenticated) {
    links.push('Logout');
  }

  const redirect = (route: string): any => {
    if (props.isAuthenticated || route === 'Login' || route === 'Create Account') {
      history.push(`${routes.get(route)}`);
    } else if (route === 'Logout') {
      props.logout();
    } else {
      history.push('/login');
    }
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event
      && event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, isMenuOpen: open });
  };

  return (
    <div>
      <React.Fragment key="menu">
        <Button
          onClick={toggleDrawer(true)}
          variant="outlined"
          color="secondary"
          size="large"
          style={{ margin: '2vh' }}
        >
          Menu
        </Button>
        <SwipeableDrawer
          open={state.isMenuOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>

              {links.map(
                (text, index) => (
                  <ListItem button key={text} onClick={() => redirect(text)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ),
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
  logout: () => {};
}

const mapStateToProps = (state: State): NavigationDrawerProps => ({
  isAuthenticated: state.applicationState.isAuthenticated,
} as unknown) as NavigationDrawerProps;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
} as unknown) as NavigationDrawerProps;

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
