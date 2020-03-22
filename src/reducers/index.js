import { combineReducers } from 'redux'
import { authReducer as auth } from './authReducer'
import { userReducer as user } from './userReducer'
import { profileReducer as profile } from 'pages/Profile/store/profileReducer'
import { homeReducer as home } from 'pages/Home/store/homeReducer'
import { browseReducer as browse } from 'pages/Browse/store/browseReducer'
import { socialReducer as social } from './socialReducer'
import { collectionReducer as collections } from './collectionReducer'
import { notificationsReducer as notifications } from 'pages/Notifications/store/notificationsReducer'
import { searchReducer as search } from 'pages/Navbar/store/searchReducer'
import { authModalReducer as modal } from 'pages/Landing/store/authModalReducer'
import { tagReducer as tagPosts } from 'pages/HashTag/store/tagReducer'
import { goalReducer as goals } from './goalReducer'

export default combineReducers({
  auth,
  user,
  profile,
  home,
  browse,
  social,
  collections,
  notifications,
  search,
  modal,
  tagPosts,
  goals,
})
