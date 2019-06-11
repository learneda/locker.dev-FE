import axios from 'apis/axiosAPI'
import {
  EDIT_USER,
  FETCH_COLLECTIONS,
  CREATE_COLLECTION,
  EDIT_COLLECTION,
  DELETE_COLLECTION,
  ADD_TO_FEED,
} from './types'

//* Edits user (profile) on user input
export const editUser = (id, profile) => async dispatch => {
  const res = await axios.put(`/users/edit`, { id, ...profile })
  dispatch({ type: EDIT_USER, payload: res.data })
}

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

    //* Feed post's are expecting to have these to properties on them
    sharedCollection['comments'] = []
    sharedCollection['likes'] = 0
    dispatch({ type: ADD_TO_FEED, payload: sharedCollection })
  }
}
