import axios from 'apis/axiosAPI'
import * as types from './types'

// Edits user (profile) on user input
export const editUser = (id, profile) => async dispatch => {
  const res = await axios.put(`/users/edit`, { id, ...profile })
  dispatch({ type: types.EDIT_USER, payload: res.data })
}

// Fetch user locker
export const fetchCollections = () => async dispatch => {
  const res = await axios.get(`/posts`)
  dispatch({ type: types.FETCH_COLLECTIONS, payload: res.data })
}
// Save to user locker
export const createCollection = post => async dispatch => {
  // response object returned by this function
  let responseObj = {}
  try {
    // requesting to insert new record to posts tbl
    const res = await axios.post(`/posts`, post)
    // dispatching the new created record from the response
    dispatch({ type: types.CREATE_COLLECTION, payload: res.data })
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

// Delete from user locker
export const deleteCollection = id => async dispatch => {
  try {
    // deleting record from posts tbl where id equals <id>
    const res = await axios.delete(`/posts/${id}`)
    dispatch({ type: types.DELETE_COLLECTION, payload: res.data })
    // deleting record from saved_post_id tbl
    // await axios.delete(`/users/saved-post-ids/${id}`)
  } catch (err) {
    // if this error is hit its probably bc id wasn't found on save_post_id
    // console.log('sorry 4 that err')
  }
}

//? Edit from user locker (DEPRECATED?!)
export const editCollection = editedCollection => async dispatch => {
  const collection = await axios.put(
    `/posts/${editedCollection.id}`,
    editedCollection
  )
  if (collection) {
    dispatch({ type: types.EDIT_COLLECTION, payload: collection.data })
  }
}

// Share post to Feed
export const postToFeed = post => async dispatch => {
  let newPost = await axios.post('/newsfeed', { post })
  newPost = newPost.data
  dispatch({ type: types.ADD_TO_FEED, payload: newPost })
}

// Delete post from Feed
export const deletePostFromFeed = post => async dispatch => {
  const deletedPost = await axios.delete(`/newsfeed/${post}`)
  if (deletedPost) {
    dispatch({
      type: types.DELETE_POST,
      payload: deletedPost.data.deletedPost.id,
    })
  }
}
