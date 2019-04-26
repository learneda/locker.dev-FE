import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import logger from 'redux-logger'

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, applyMiddleware(thunk));
} else {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware(thunk, logger))
    composeEnhancers(applyMiddleware(thunk))
  );
}

export default store;
