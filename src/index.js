import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
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
  const logger = require('redux-logger').default;
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
}
const options = {
  position: positions.TOP_CENTER,
  timeout: 3000
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
