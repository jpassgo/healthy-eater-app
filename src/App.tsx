import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Router } from 'react-router';
import Grid from '@material-ui/core/Grid';
import NavigationDrawer from './components/NavigationDrawer';
import { State } from './config/store';
import LoginPage from './components/LoginPage';
import routes from './constants/routes';
import CreateAccountPage from './components/CreateAccountPage';
import Title from './components/Title';
import ReportMealsPage from './components/ReportMealsPage';

export function getLightTheme(): Theme {
  return createMuiTheme();
}

const history = createBrowserHistory();

const App = (): JSX.Element => (
  <MuiThemeProvider theme={getLightTheme()}>

    <Router history={history}>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justify="center"
      >
        <Grid item xs={5} style={{ marginLeft: '2.5%' }}>
          <NavigationDrawer />
        </Grid>
        <Grid item xs>
          <Title />
        </Grid>
      </Grid>

      <Route path={routes.HOME_PAGE} />
      <Route path={routes.LOGIN_PAGE}>
        <LoginPage />
      </Route>
      <Route path={routes.CREATE_ACCOUNT_PAGE}>
        <CreateAccountPage />
      </Route>
      <Route path={routes.REPORT_MEALS_PAGE}>
        <ReportMealsPage />
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
