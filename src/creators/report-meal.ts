import { AnyAction } from 'redux';
import actions from '../actions/actions';
import Meal from '../models/Meal';

// eslint-disable-next-line import/prefer-default-export
export const mealReported = (): AnyAction => ({
  type: actions.REPORT_MEAL,
});
