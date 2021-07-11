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
        console.log('CREATE_ACCOUNT');
        newState.authToken = action.authToken;
        newState.isAuthenticated = true;
        break;
      case actions.LOGIN_SUCCESS:
        console.log('LOGIN_SUCCESS');
        newState.authToken = action.token;
        newState.isAuthenticated = true;
        newState.userName = action.userName;
        break;
      case actions.LOGIN_ERROR:
        console.log('LOGIN_ERROR');
        newState.isAuthenticated = false;
        newState.isLoginErrorPresent = true;
        break;
      case actions.LOGOUT:
        console.log('LOGOUT');
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
  isLoginErrorPresent: boolean;
  authToken: string;
  userName: string;
}
