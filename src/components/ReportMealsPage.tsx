/* eslint-disable react/destructuring-assignment */
import Grid from '@material-ui/core/Grid';
import React, { ChangeEvent, useState } from 'react';
import { Dispatch } from 'redux';
import Card from '@material-ui/core/Card/Card';
import {
  Button, CardContent, makeStyles, TextField, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from '../config/store';
import LoginPage from './LoginPage';

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

interface ReportMealsPageState {
  name: string;
  caloricValue: number;
}

const ReportMealsPage = (props: ReportMealsPageProps): JSX.Element => {
  const classes = styles();
  const [state, setState] = useState<ReportMealsPageState>({
    name: '',
    caloricValue: 0,
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      { !props.isAuthenticated ? (
        <LoginPage />
      ) : (
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
                  Report Meals
                </Typography>
                <form>
                  <Grid item>
                    <TextField
                      id="outlined-username-input"
                      label="Name"
                      name="username"
                      variant="outlined"
                      onChange={handleTextChange}
                      value={state.name}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="outlined-password-input"
                      label="Caloric Value"
                      name="calories"
                      variant="outlined"
                      onChange={handleTextChange}
                      value={state.caloricValue}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleLoginClick}>
                      Submit
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

export interface ReportMealsPageProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: State): ReportMealsPageProps => (
  {
    isAuthenticated: state.applicationState.isAuthenticated,
  });

const mapDispatchToProps = (dispatch: Dispatch): ReportMealsPageProps => (
  {

  } as unknown) as ReportMealsPageProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportMealsPage);
