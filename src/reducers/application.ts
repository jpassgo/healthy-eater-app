import actions from "../actions/actions";
import { AnyAction } from "redux";

export default {
  reducer(
    state: ApplicationState = ({} as unknown) as ApplicationState,
    action: AnyAction
  ): ApplicationState {
    let newState = Object.assign({}, state);
    switch (action.type) {
      case actions.LOGIN_ATTEMPT:
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