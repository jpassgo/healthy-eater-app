import { ChangeEvent, useState } from "react";
import { Dispatch } from "redux";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { State } from "../config/store";
import { connect } from "react-redux";
import { loginAttempt } from "../creators/login";

const styles = makeStyles(() => ({
  gridContainer: {},
}));

interface LoginPageState {
  username: string;
  password: string;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const [state, setState] = useState<LoginPageState>({
    username: "",
    password: "",
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (event) {
      event.preventDefault();
    }

    props.handleLoginClick(state.username, state.password);
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
    >
      <form>
        <Grid item>
          <TextField
            id="outlined-username-input"
            label="Username"
            autoComplete="current-username"
            variant="outlined"
          />
        </Grid>

        <Grid item>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export interface LoginPageProps {
  handleLoginClick: (username: string, password: string) => void;
}

const mapStateToProps = (state: State): LoginPageProps => {
  return {
    handleLoginClick: (username: string, password: string) => {
      console.log("hello");
    },
  };
};

const mapDispatchToProps = (dispatch: Dispatch): LoginPageProps => {
  return ({
    handleLoginClick: (username: string, password: string) => {
      dispatch(loginAttempt(username, password));
    },
  } as unknown) as LoginPageProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
