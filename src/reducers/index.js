import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { homeReducer } from './homeReducer';
import { browseReducer } from './browseReducer';
import { modalReducer } from './modalReducer';
import { postReducer } from './postReducer';
import { likedPostReducer } from './likedPostReducer';
import { searchReducer } from './searchReducer';
import { followReducer } from './followReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  browse: browseReducer,
  modalState: modalReducer,
  posts: postReducer,
  likedPosts: likedPostReducer,
  search_term: searchReducer,
  follow: followReducer,
  user_details: userReducer,
});
