import { Store, applyMiddleware, combineReducers, createStore as baseCreateStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import application, { ApplicationState } from "../reducers/application";

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )(baseCreateStore),
    allReducers = combineReducers({
      applicationState: application.reducer,
      router: connectRouter(history)
    });

  return createStoreFunc(allReducers, {
    applicationState: ({} as unknown) as ApplicationState,
  });
};

export interface State {
  applicationState: ApplicationState;
}