import { AnyAction } from 'redux';
import actions from '../actions/actions';

export const loginAttempt = (username: string, password: string): AnyAction => ({
  type: actions.LOGIN_ATTEMPT,
  username,
  password,
});

export const loginSuccess = (): AnyAction => ({
  type: actions.LOGIN_SUCCESS,
});

export const loginError = (): AnyAction => ({
  type: actions.LOGIN_ERROR,
});

export const logout = (): AnyAction => ({
  type: actions.LOGOUT,
});
