import axios from 'axios'
import {
  FETCH_AUTH,
  FETCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  SAVE_LINK,
  FETCH_POSTS,
  DELETE_POST,
  LIKED_POSTS,
  SET_SEARCH_TERM,
  RESET_SEARCH_TERM,
  EDIT_USER,
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  FETCH_USER,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  UPDATE_POSTS_STATE,
  LOADING_SUGGESTED,
  LOADED_SUGGESTED,
  FETCH_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  GET_LOCKER,
} from './types'

import { post as URL } from '../services/baseURL'
axios.defaults.withCredentials = true

export const fetchAuth = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`)
  dispatch({ type: FETCH_AUTH, payload: res.data })
}

export const getCourses = page => async dispatch => {
  const res = await axios.get(`${URL}/api/courses?page=${page}`)
  dispatch({ type: FETCH_COURSES, payload: res.data.results })
}

export const getArticles = () => async dispatch => {
  const res = await axios.get(`${URL}/api/articles`)
  dispatch({ type: FETCH_ARTICLES, payload: res.data })
}

export const authModalToggle = () => ({ type: AUTH_MODAL_TOGGLE })

export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP })

export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN })

export const saveLink = post => async dispatch => {
  const res = await axios.post(`${URL}/api/posts`, { post_url: post })
  dispatch({ type: SAVE_LINK, payload: res.data })
}

// get all user posts
export const fetchPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts`)
  dispatch({ type: FETCH_POSTS, payload: res.data })
}

// add new user post to posts state
export const updatePostsState = post => async dispatch => {
  dispatch({ type: UPDATE_POSTS_STATE, payload: post })
}

export const deletePost = id => async dispatch => {
  const res = await axios.delete(`${URL}/api/posts/${id}`)
  dispatch({ type: DELETE_POST, payload: res.data })
}

export const getlikedPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts/likes`)
  dispatch({ type: LIKED_POSTS, payload: res.data })
}

export const editProfile = (id, profile) => async dispatch => {
  const res = await axios.put(`${URL}/api/users/edit`, { id, ...profile })
  dispatch({ type: EDIT_USER, payload: res.data })
}

export const setSearchTerm = e => ({
  type: SET_SEARCH_TERM,
  payload: e.target.value,
})

export const resetSearchTerm = () => ({
  type: RESET_SEARCH_TERM,
  payload: '',
})

export const getFollowersAndFollowingCount = () => async dispatch => {
  const res = await axios.get(`${URL}/api/users/followStats`)
  dispatch({ type: GET_FOLLOWERS_AND_FOLLOWING_COUNT, payload: res.data })
}

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/id/${id}`)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const followAUser = payload => async dispatch => {
  const res = await axios.post(`${URL}/api/users/subscribe`, payload)
  dispatch({ type: FOLLOW_A_USER, payload: res.data })
}

export const unfollowAUser = payload => async dispatch => {
  const res = await axios.delete(`${URL}/api/users/unsubscribe`, {
    data: {
      user_id: payload.user_id,
      friend_id: Number(payload.friend_id),
    },
  })
  dispatch({ type: UNFOLLOW_A_USER, payload: res.data })
}

export const getFollowing = friend_id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/following/${friend_id}`)
  dispatch({ type: GET_FOLLOWING, payload: res.data.following })
}

export const recommendedFollow = id => async dispatch => {
  dispatch({ type: LOADING_SUGGESTED })
  const res = await axios.get(`${URL}/api/users/recommendedFollow?id=${id}`)
  dispatch({ type: RECOMMENDED_FOLLOW, payload: res.data })
  dispatch({ type: LOADED_SUGGESTED })
}

// get a users following list
export const getUserFollowing = id => async dispatch => {
  const following = await axios.get(`${URL}/api/users/following?id=${id}`)
  dispatch({ type: GET_USER_FOLLOWING, payload: following.data })
}

// get a users followers list
export const getUserFollowers = id => async dispatch => {
  const followers = await axios.get(`${URL}/api/users/followers?id=${id}`)
  dispatch({ type: GET_USER_FOLLOWERS, payload: followers.data })
}

export const populateNotifications = NotificationsArr => ({
  type: FETCH_NOTIFICATIONS,
  payload: NotificationsArr,
})

export const readNotifications = () => async dispatch => {
  await axios.post(`${URL}/api/notifications/read`)
}

export const deleteNotifications = () => async dispatch => {
  await axios.delete(`${URL}/api/notifications/clear`)

  dispatch({ type: CLEAR_NOTIFICATIONS })
}

export const fetchLocker = () => async dispatch => {
  dispatch({ type: LOADING_SUGGESTED })
  const lockerData = await axios.get(`${URL}/api/locker`)
  dispatch({ type: LOADED_SUGGESTED })
  if (lockerData.data.length) {
    dispatch({ type: GET_LOCKER, payload: lockerData.data })
  }
}
