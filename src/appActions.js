import * as type from './appTypes'
import axiosAuth from 'apis/axiosAuth'
import axios from 'apis/axiosAPI'

//* Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
  const { id, ...user } = res.data
  if (id) {
    dispatch({ type: type.FETCH_AUTH, payload: { id } })
    dispatch({ type: type.FETCH_USER, payload: user })
  } else {
    dispatch({ type: type.FETCH_AUTH, payload: false })
  }
  return res.data
}
//* Fetch user details
export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/users/id/${id}`)
  dispatch({ type: type.FETCH_USER, payload: res.data })
}

export const fetchNotifications = notifications => ({
  type: type.FETCH_NOTIFICATIONS,
  payload: notifications,
})

export const createComment = commentData => async dispatch => {
  console.log(commentData)
  dispatch({ type: type.CREATE_COMMENT, payload: commentData })
}

export const deleteComment = commentData => async dispatch => {
  dispatch({ type: type.DELETE_COMMENT, payload: commentData })
}

export const likePost = postData => async dispatch => {
  // console.log(commentData)
  dispatch({ type: type.LIKE_POST, payload: postData })
}

export const unlikePost = postData => async dispatch => {
  dispatch({ type: type.UNLIKE_POST, payload: postData })
}

export const ponyUp = data => dispatch => {
  dispatch({ type: type.PONY_UP, payload: data })
}

export const ponyDown = data => dispatch => {
  dispatch({ type: type.PONY_DOWN, payload: data })
}
