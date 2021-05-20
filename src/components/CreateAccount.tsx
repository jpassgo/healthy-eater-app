import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../config/store';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

/* eslint-disable @typescript-eslint/no-unused-vars */
const CreateAccountPage = (props: CreateAccountPageProps): JSX.Element => {
  const classes = styles();
  const [state, setState] = useState<LoginPageState>({
    username: '',
    password: '',
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                  id="outlined-firstName-input"
                  label="First Name"
                  name="first name"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={state.firstName}
                />
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-lastName-input"
                  label="Last Name"
                  name="last name"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={state.lastName}
                />
              </Grid>

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
                  id="outlined-email-input"
                  label="Email Address"
                  name="email address"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={state.emailAddress}
                />
              </Grid>
              

              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleLoginClick}>
                  Create Account
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

interface CreateAccountPageProps {

}

const mapStateToProps = (state: State): CreateAccountPageProps => ({} as unknown) as CreateAccountPageProps;

const mapDispatchToProps = (): CreateAccountPageProps => ({} as unknown) as CreateAccountPageProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage);
