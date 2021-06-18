import { AnyAction } from 'redux';
import actions from '../actions/actions';
import Meal from '../models/meal';

// eslint-disable-next-line import/prefer-default-export
export const reportMeal = (): AnyAction => ({
  type: actions.REPORT_MEAL,
});
