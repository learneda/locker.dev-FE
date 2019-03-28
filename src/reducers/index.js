import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { browseReducer } from './browseReducer';
import { postReducer } from './postReducer';

export default combineReducers({
  auth: authReducer,
  browse: browseReducer,
  modalState: authReducer,
  post: postReducer
});
