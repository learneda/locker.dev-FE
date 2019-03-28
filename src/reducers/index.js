import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { browseReducer } from './browseReducer';

export default combineReducers({
  auth: authReducer,
  browse: browseReducer,
  modalState: authReducer
});
