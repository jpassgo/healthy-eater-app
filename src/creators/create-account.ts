import { AnyAction } from 'redux';
import actions from '../actions/actions';

// eslint-disable-next-line import/prefer-default-export
export const accountCreationSuccessful = (username: string, authToken: string): AnyAction => ({
  type: actions.CREATE_ACCOUNT,
  username,
  authToken,
});
