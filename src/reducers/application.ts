/* eslint-disable no-console */
import { AnyAction } from 'redux';
import actions from '../actions/actions';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction,
  ): ApplicationState {
    let newState = { ...state };
    switch (action.type) {
      case actions.CREATE_ACCOUNT:
        newState.token = action.token;
        newState.isAuthenticated = true;
        break;
      case actions.LOGIN_SUCCESS:
        console.log('LOGIN_SUCCESS');
        newState.token = action.token;
        newState.isAuthenticated = true;
        break;
      case actions.LOGIN_ERROR:
        newState.isAuthenticated = false;
        break;
      case actions.LOGOUT:
        newState.isAuthenticated = false;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  isAuthenticated: boolean;
  token: string,
}
