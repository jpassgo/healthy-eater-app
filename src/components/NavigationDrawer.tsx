import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import { connect } from 'react-redux';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { useHistory } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import { State } from '../config/store';

const NavigationDrawer = (props: NavigationDrawerProps) => {
  const history = useHistory();

  const [state, setState] = React.useState({
    isMenuOpen: false,
  });

  const routes = new Map([
    ['Home', '/'],
    ['Login', '/login'],
    ['Create Acount', '/create'],
  ]);

  const redirect = (route: string): any => {
    if (props.isAuthenticated || route === 'Login') {
      history.push(`${routes.get(route)}`);
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
              {['Home', 'Account', 'Report Meal', 'Calorie Search', 'Login', 'Create Account'].map(
                (text, index) => (
                  <ListItem button key={text} onClick={() => redirect(text)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
}

const mapStateToProps = (state: State): NavigationDrawerProps => ({
  isAuthenticated: state.applicationState.isAuthenticated,
} as unknown) as NavigationDrawerProps;

const mapDispatchToProps = () => ({} as unknown) as NavigationDrawerProps;

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
