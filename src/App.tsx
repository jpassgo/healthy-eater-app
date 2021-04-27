import React, { Component } from "react";
import LoginPage from "./components/LoginPage";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
import { State } from "./config/store";
import { connect } from "react-redux";
import NavigationBar from "./components/NavigationBar";

export function getLightTheme(): Theme {
  return createMuiTheme();
}

const App = (props: AppProps): JSX.Element => {
  return (
    <MuiThemeProvider theme={getLightTheme()}>
      <NavigationBar />
      <LoginPage />
    </MuiThemeProvider>
  );
};

export interface AppProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: State): AppProps => {
  return ({
    isAuthenticated: state.applicationState.isAuthenticated,
  } as unknown) as AppProps;
};

const mapDispatchToProps = (): AppProps => (({} as unknown) as AppProps);

export default connect(mapStateToProps, mapDispatchToProps)(App);
