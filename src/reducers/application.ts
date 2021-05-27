import { AnyAction } from 'redux';
import actions from '../actions/actions';

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction,
  ): ApplicationState {
    let newState = { ...state };
    switch (action.type) {
      case actions.LOGIN_ATTEMPT:
        newState.username = action.username;
        newState.password = action.password;
        break;
      case actions.CREATE_ACCOUNT:
        newState.username = action.username;
        newState.password = action.password;
        newState.firstName = action.firstName;
        newState.lastName = action.lastName;
        newState.emailAddress = action.emailAddress;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ApplicationState {
  isAuthenticated: boolean;
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  emailAddress: string,
}
