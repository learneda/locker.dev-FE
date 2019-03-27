import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import rootReducer from './reducers';
import 'typeface-roboto';
import './styles/index.css';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, applyMiddleware(thunk));
} else {
  const logger = require('redux-logger').default;
  store = createStore(rootReducer, applyMiddleware(thunk, logger));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);
