import { AnyAction } from 'redux';
import actions from '../actions/actions';

// eslint-disable-next-line import/prefer-default-export
export const createAccount = (username: string, password: string,
  firstName: string, lastName: string, emailAddress: string): AnyAction => ({
  type: actions.CREATE_ACCOUNT,
  username,
  password,
  firstName,
  lastName,
  emailAddress,
});
