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
import Meal from '../models/Meal';
import { reportMeal } from '../services/healthy-eater-api';
import Food from '../models/Food';
import { mealReported } from '../creators/report-meal';

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

    const mealContents: Food[] = [{
      name: 'Blue Berry',
      caloricValue: 100,
    }];

    const meal: Meal = {
      userId: 1,
      meal: mealContents,
      caloricValue: 100,
      date: new Date('2022-01-01'),
    };

    reportMeal(meal, props.authToken);
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
            direction="row"
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
                      name="name"
                      variant="outlined"
                      onChange={handleTextChange}
                      value={state.name}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="outlined-password-input"
                      label="Caloric Value"
                      name="caloricValue"
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
  authToken: string;
  reportMeal: (meal: Meal) => {};
}

const mapStateToProps = (state: State): ReportMealsPageProps => (
  {
    isAuthenticated: state.applicationState.isAuthenticated,
    authToken: state.applicationState.authToken,
  } as unknown) as ReportMealsPageProps;

const mapDispatchToProps = (dispatch: Dispatch): ReportMealsPageProps => ({
  reportMeals: (meal: Meal, authToken: string) => {
    // eslint-disable-next-line @typescript-eslint/semi
    reportMeal(meal, authToken)
      .then(() => {
        dispatch(mealReported());
      })
      .catch((error: Error) => {
        console.error(`${error}`);
      });
  },
} as unknown) as ReportMealsPageProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportMealsPage);
