import axiosAuth from 'apis/axiosBackend'
import axios from 'apis/axiosAPI'
import {
  FETCH_AUTH,
  FETCH_USER,
  EDIT_USER,
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  FETCH_COLLECTIONS,
  CREATE_COLLECTION,
  EDIT_COLLECTION,
  DELETE_COLLECTION,
  SET_SEARCH_TERM,
  RESET_SEARCH_TERM,
  FETCH_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  ADD_TO_FEED,
} from './types'

//* Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/auth/current_user`)
  dispatch({ type: FETCH_AUTH, payload: res.data })
}
//* Fetch user details on Home mount
export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/users/id/${id}`)
  dispatch({ type: FETCH_USER, payload: res.data })
}
//* Edits user (profile) on user input
export const editUser = (id, profile) => async dispatch => {
  const res = await axios.put(`/users/edit`, { id, ...profile })
  dispatch({ type: EDIT_USER, payload: res.data })
}
//* Toggle Auth modal on user input
export const authModalToggle = () => ({ type: AUTH_MODAL_TOGGLE })
//* Select Auth-SignUp tab on user input
export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP })
//* Select Auth-Login tab on user input
export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN })
//* Get all user collections
export const fetchCollections = () => async dispatch => {
  const res = await axios.get(`/posts`)
  dispatch({ type: FETCH_COLLECTIONS, payload: res.data })
}
export const createCollection = post => async dispatch => {
  let msg
  try {
    const res = await axios.post(`/posts`, post)
    dispatch({ type: CREATE_COLLECTION, payload: res.data })
    msg = 'success'
  } catch (err) {
    console.log(err)
    msg = 'whoops!'
  } finally {
    return new Promise(function(resolve, reject) {
      resolve(msg)
    })
  }
}
export const deleteCollection = id => async dispatch => {
  const res = await axios.delete(`/posts/${id}`)
  dispatch({ type: DELETE_COLLECTION, payload: res.data })
}
export const editCollection = editedCollection => async dispatch => {
  const collection = await axios.put(
    `/posts/${editedCollection.id}`,
    editedCollection
  )
  if (collection) {
    dispatch({ type: EDIT_COLLECTION, payload: collection.data })
  }
}
export const shareCollection = collection => async dispatch => {
  // edit collection
  const editCollection = await axios.put(`/posts/${collection.id}`, collection)
  if (editCollection) {
    dispatch({ type: EDIT_COLLECTION, payload: editCollection.data })
    // insert new record to newfeed table
    await axios.post(`/posts/share`, {
      id: collection.id,
      user_id: editCollection.data.user_id,
    })

    const sharedCollection = editCollection.data

    //* Feed post's are exprecting to have these to properties on them
    sharedCollection['comments'] = []
    sharedCollection['likes'] = 0
    dispatch({ type: ADD_TO_FEED, payload: sharedCollection })
  }
}
//* Sets search term on user input
export const setSearchTerm = e => ({
  type: SET_SEARCH_TERM,
  payload: e.target.value,
})
//* Resets search on user input
export const resetSearchTerm = () => ({
  type: RESET_SEARCH_TERM,
  payload: '',
})
export const fetchNotifications = NotificationsArr => ({
  type: FETCH_NOTIFICATIONS,
  payload: NotificationsArr,
})
export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: CLEAR_NOTIFICATIONS })
}
