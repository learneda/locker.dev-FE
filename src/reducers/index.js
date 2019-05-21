import { combineReducers } from 'redux'
import { authReducer as auth } from './authReducer'
import { browseReducer as browse } from './browseReducer'
import { modalReducer as modal } from './modalReducer'
import { collectionReducer as collections } from './collectionReducer'
import { searchReducer as searchTerm } from './searchReducer'
import { socialReducer as social } from './socialReducer'
import { userReducer as user } from './userReducer'
import { notificationsReducer as notifications } from './notificationsReducer'
import { lockerReducer as locker } from './lockerReducer'
import { feedReducer as feed } from './feedReducer'

export default combineReducers({
  auth,
  browse,
  modal,
  collections,
  searchTerm,
  social,
  user,
  notifications,
  locker,
  feed,
})
