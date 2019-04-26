<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import * as serviceWorker from './serviceWorker';
import Alert from './components/utils/Alert';

import App from './App';
import rootReducer from './reducers';
import 'typeface-roboto';
import './styles/index.css';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, applyMiddleware(thunk));
} else {
  // const logger = require('redux-logger').default
  store = createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware(thunk, logger))
    composeEnhancers(applyMiddleware(thunk))
  );
}
=======
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { positions, Provider as AlertProvider } from 'react-alert'
import Alert from './components/utils/Alert'

import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

import 'typeface-roboto'
import './styles/index.css'

>>>>>>> f1f2754cd1d8671588bd2f35540320d65ecd1a94
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AlertProvider template={Alert} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
