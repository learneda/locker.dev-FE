import { combineReducers } from 'redux'
import { authReducer as auth } from './authReducer'
import { userReducer as user } from './userReducer'
import { profileReducer as profile } from 'pages/Profile/profileReducer'
import { homeReducer as home } from 'pages/Home/homeReducer'
import { browseReducer as browse } from 'pages/Browse/browseReducer'
import { socialReducer as social } from './socialReducer'
import { collectionReducer as collections } from './collectionReducer'
import { notificationsReducer as notifications } from './notificationsReducer'
import { searchReducer as searchTerm } from 'components/navigation/searchReducer'
import { modalReducer as modal } from './modalReducer'

export default combineReducers({
  auth,
  user,
  profile,
  home,
  browse,
  social,
  collections,
  notifications,
  searchTerm,
  modal,
})
