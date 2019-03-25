import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { udemyReducer } from './udemyReducer';

export default combineReducers({
  auth: authReducer,
  udemy: udemyReducer
});
