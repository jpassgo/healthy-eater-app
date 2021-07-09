/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line radix
import Grid from '@material-ui/core/Grid';
import React, { ChangeEvent, Fragment, useState } from 'react';
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
  inputsList: any;
}

const ReportMealsPage = (props: ReportMealsPageProps): JSX.Element => {
  const classes = styles();
  const [state, setState] = useState<ReportMealsPageState>({
    inputsList: [{ 'name-0': '', 'caloricValue-0': 0 }],
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const resultOfSplit = event.target.name.split('-');
    const index = parseInt(resultOfSplit[1]);

    state.inputsList[index][event.target.name] = event.target.value;
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const mealContents: Food[] = [{
      name: 'Blue Berry',
      caloricValue: 100,
    }];

    let caloricSum: number;

    state.inputsList.forEach((map: Map<string, any>) => {
      map.forEach((key: string, value: any) => {
        if (!Number.isNaN(value)) {
          caloricSum += value;
        }

        mealContents.push({
          name: key,
          caloricValue: value,
        });
      });
    });

    state.inputsList.forEach((map: Map<string, any>) => {
      const keys = map.keys();

      // if (!Number.isNaN(value)) {
      //   caloricSum += value;
      // }

      mealContents.push({
        name: map.get(keys.next()),
        caloricValue: value,
      });
    });

    const meal: Meal = {
      userId: 1,
      meal: mealContents,
      caloricValue: 100,
      date: new Date(),
    };

    reportMeal(meal, props.authToken);
  };

  const addInput = () => {
    const index = state.inputsList.length - 1;
    setState((prevState) => ({
      inputsList: [...prevState.inputsList, { [`name` + index]: '', [`caloricValue` + index]: 0 }],
    }));
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '25vh',
        }}
      >
        { !props.isAuthenticated ? (
          <LoginPage />
        ) : (
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
                  {state.inputsList.map((val: any, idx: number) => (
                    <>
                      <Grid item>
                        <TextField
                          id={`name-${idx}`}
                          data-id={`name-${idx}`}
                          label="Name"
                          name={`name-${idx}`}
                          variant="outlined"
                          key={`name-${idx}`}
                          onChange={handleTextChange}
                          value={val.name}
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          id={`caloricValue-${idx}`}
                          data-id={`caloricValue-${idx}`}
                          label="Caloric Value"
                          name={`caloricValue-${idx}`}
                          variant="outlined"
                          key={`caloricValue-${idx}`}
                          onChange={handleTextChange}
                          value={val.caloricValue}
                        />
                      </Grid>
                    </>
                  ))}
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={addInput}>
                      Add Food
                    </Button>
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
        )}
      </div>
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
