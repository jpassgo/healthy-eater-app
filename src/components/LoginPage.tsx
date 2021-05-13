import React, { ChangeEvent, useState } from 'react';
import { Dispatch } from 'redux';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { State } from '../config/store';
import { loginAttempt } from '../creators/login';
import authenticateUser from '../services/healthy-eater-api';

const styles = makeStyles(() => ({
  gridContainer: {},
  root: {
    minWidth: 250,
    minHeight: 250,

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

interface LoginPageState {
  username: string;
  password: string;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const classes = styles();
  const [state, setState] = useState<LoginPageState>({
    username: '',
    password: '',
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`${event.target.name} - ${event.target.value}`);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    props.handleLoginClick(state.username, state.password);
  };

  return (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '25vh',
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >

        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Healthy Eater
            </Typography>
            <form>
              <Grid item>
                <TextField
                  id="outlined-username-input"
                  label="Username"
                  name="username"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={state.username}
                />
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={state.password}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleLoginClick}>
                  Login
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export interface LoginPageProps {
  handleLoginClick: (username: string, password: string) => void;
}

const mapStateToProps = (state: State): LoginPageProps => ({
  handleLoginClick: (username: string, password: string) => {
    console.log(`${authenticateUser(username, password)}`);
  },
});

const mapDispatchToProps = (dispatch: Dispatch): LoginPageProps => ({
  handleLoginClick: (username: string, password: string) => {
    console.log(`${authenticateUser(username, password)}`);
    dispatch(loginAttempt(username, password));
  },
} as unknown) as LoginPageProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
