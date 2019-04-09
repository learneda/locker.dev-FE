import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { browseReducer } from './browseReducer';
import { modalReducer } from './modalReducer';
import { postReducer } from './postReducer';
import { likedPostReducer } from './likedPostReducer';
import { searchReducer } from './searchReducer';
import { followReducer } from './followReducer';

export default combineReducers({
  auth: authReducer,
  browse: browseReducer,
  modalState: modalReducer,
  posts: postReducer,
  likedPosts: likedPostReducer,
  search_term: searchReducer,
  followers: followReducer
});
