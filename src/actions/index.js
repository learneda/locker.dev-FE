import axiosAuth from 'apis/axiosAuth'
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
  ADD_TO_FEED,
} from './types'

//* Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
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
  // response object returned by this function
  let responseObj = {}
  try {
    // requesting to insert new record to posts tbl
    const res = await axios.post(`/posts`, post)
    // dispatching the new created record from the response
    dispatch({ type: CREATE_COLLECTION, payload: res.data })
    // attaching the id of the new created record on to the response obj
    responseObj['post_id'] = res.data.id
    // attaching the status of the response if no error is thrown
    responseObj['msg'] = 'success'
  } catch (err) {
    console.log(err)
    // attaching the status of the response if an error is thrown
    responseObj['msg'] = 'whoops!'
  } finally {
    // returning a new promise that will return the responseObj
    return new Promise(function(resolve, reject) {
      resolve(responseObj)
    })
  }
}

export const deleteCollection = id => async dispatch => {
  try {
    // deleting record from posts tbl where id equals <id>
    const res = await axios.delete(`/posts/${id}`)
    dispatch({ type: DELETE_COLLECTION, payload: res.data })
    // deleting record from saved_post_id tbl
    await axios.delete(`/users/saved-post-ids/${id}`)
  } catch (err) {
    // if this error is hit its probably bc id wasn't found on save_post_id
    console.log('sorry 4 that err')
  }
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
