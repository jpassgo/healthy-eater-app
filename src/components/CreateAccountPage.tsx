/* eslint-disable react/destructuring-assignment */
import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { State } from '../config/store';
import { createAccount } from '../services/healthy-eater-api';
import { accountCreationSuccessful } from '../creators/create-account';

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

interface CreateAccountPageState {
  accountCreated: boolean;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const CreateAccountPage = (props: CreateAccountPageProps): JSX.Element => {
  const classes = styles();
  const [state, setState] = useState<CreateAccountPageState>({
    accountCreated: false,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateAccountClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    state.accountCreated = true;

    props.handleCreateAccountClick(state.username, state.password, state.firstName,
      state.lastName, state.emailAddress);
  };

  return (
    <>
      { props.isAuthenticated || state.accountCreated
        ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '25vh',
            }}
          >
            You&apos;re logged in and ready to roll!
          </div>
        )
        : (
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
                      <TextField
                        id="outlined-firstName-input"
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={state.firstName}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        id="outlined-lastName-input"
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={state.lastName}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        id="outlined-email-input"
                        label="Email Address"
                        name="emailAddress"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={state.emailAddress}
                      />
                    </Grid>

                    <Grid item>
                      <Button variant="contained" color="secondary" onClick={handleCreateAccountClick}>
                        Create Account
                      </Button>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </div>
        )}
    </>
  );
};

interface CreateAccountPageProps {
  isAuthenticated: boolean;
  handleCreateAccountClick: (username: string, password: string,
    firstName: string, lastName: string, emailAddress: string) => {};
}

const mapStateToProps = (state: State): CreateAccountPageProps => ({
  isAuthenticated: state.applicationState.isAuthenticated,
} as unknown) as CreateAccountPageProps;

const mapDispatchToProps = (dispatch: Dispatch): CreateAccountPageProps => ({
  handleCreateAccountClick: (username: string, password: string,
    firstName: string, lastName: string, emailAddress: string) => {
    createAccount(username, password, firstName, lastName, emailAddress)
      .then((response: string) => {
        console.log('Creating account...');
        dispatch(accountCreationSuccessful(username, response));
      })
      .catch((error: Error) => {
        console.error(`Error authenticating user: ${error}`);
      });
  },

} as unknown) as CreateAccountPageProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage);
