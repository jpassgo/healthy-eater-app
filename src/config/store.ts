import {
  Store, applyMiddleware, combineReducers, createStore as baseCreateStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import application, { ApplicationState } from '../reducers/application';

export const createStore = (history: History): Store => {
  const createStoreFunc = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
  )(baseCreateStore);
  const allReducers = combineReducers({
    applicationState: application.reducer,
    router: connectRouter(history),
    routing: routerReducer,
  });

  return createStoreFunc(allReducers, {
    applicationState: ({} as unknown) as ApplicationState,
  });
};

export interface State {
  applicationState: ApplicationState;
}
