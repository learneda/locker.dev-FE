import { combineReducers } from 'redux'
import { authReducer as auth } from './authReducer'
import { browseReducer as browse } from './browseReducer'
import { modalReducer as modal } from './modalReducer'
import { postReducer as posts } from './postReducer'
import { likedPostReducer as likedPosts } from './likedPostReducer'
import { searchReducer as searchTerm } from './searchReducer'
import { followReducer as follow } from './followReducer'
import { userReducer as user } from './userReducer'
import { loadingReducer as loading } from './loadingReducer'
import { notificationsReducer as notifications } from './notificationsReducer'
import { lockerReducer as locker } from './lockerReducer'

export default combineReducers({
  auth,
  browse,
  modal,
  posts,
  likedPosts,
  searchTerm,
  follow,
  user,
  loading,
  notifications,
  locker,
})
