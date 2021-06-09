import { AnyAction } from 'redux';
import actions from '../actions/actions';

export const loginSuccess = (token: string): AnyAction => ({
  type: actions.LOGIN_SUCCESS,
  token,
});

export const loginError = (): AnyAction => ({
  type: actions.LOGIN_ERROR,
});

export const logout = (): AnyAction => ({
  type: actions.LOGOUT,
});
