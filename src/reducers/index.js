import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { browseReducer } from './browseReducer';
import { modalReducer } from './modalReducer';
import { postReducer } from './postReducer';

export default combineReducers({
  auth: authReducer,
  browse: browseReducer,
  modalState: modalReducer,
  post: postReducer
});
