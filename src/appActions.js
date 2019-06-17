import * as type from './appTypes'
import axiosAuth from 'apis/axiosAuth'
import axios from 'apis/axiosAPI'

//* Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
  dispatch({ type: type.FETCH_AUTH, payload: res.data })
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

export const likeComment = commentData => async dispatch => {
  // console.log(commentData)
  dispatch({ type: type.LIKE_COMMENT, payload: commentData })
}

export const unlikeComment = commentData => async dispatch => {
  dispatch({ type: type.UNLIKE_COMMENT, payload: commentData })
}

export const ponyUp = data => dispatch => {
  dispatch({ type: type.PONY_UP, payload: data })
}

export const ponyDown = data => dispatch => {
  dispatch({ type: type.PONY_DOWN, payload: data })
}
