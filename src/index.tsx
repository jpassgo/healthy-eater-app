import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from './config/store';
import { createBrowserHistory } from 'history';
import LoginPage from './components/LoginPage';
import routes from './constants/routes';
import NavigationDrawer from './components/NavigationDrawer';

const history = createBrowserHistory(),
  store = createStore(history)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>     
      <Router history={history}>
        <NavigationDrawer />        
          <Route path={routes.HOME_PAGE}>
            <App />
          </Route>
          <Route path={routes.LOGIN_PAGE}>
            <LoginPage />
          </Route>          
      </Router>
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
