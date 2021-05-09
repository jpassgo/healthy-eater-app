import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Router } from 'react-router';
import NavigationDrawer from './components/NavigationDrawer';
import { State } from './config/store';
import LoginPage from './components/LoginPage';
import routes from './constants/routes';

export function getLightTheme(): Theme {
  return createMuiTheme();
}

const history = createBrowserHistory();

const App = (): JSX.Element => (
  <MuiThemeProvider theme={getLightTheme()}>
    <Router history={history}>
      <NavigationDrawer />
      <Route path={routes.HOME_PAGE} />
      <Route path={routes.LOGIN_PAGE}>
        <LoginPage />
      </Route>
    </Router>
  </MuiThemeProvider>
);

export interface AppProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: State): AppProps => ({
  isAuthenticated: state.applicationState.isAuthenticated,
} as unknown) as AppProps;

const mapDispatchToProps = (): AppProps => (({} as unknown) as AppProps);

export default connect(mapStateToProps, mapDispatchToProps)(App);
