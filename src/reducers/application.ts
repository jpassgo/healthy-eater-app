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
}
