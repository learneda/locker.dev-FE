import * as types from './appTypes'
import axiosAuth from 'apis/axiosAuth'
import axios from 'apis/axiosAPI'

// Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
  const { ...user } = res.data
  if (user.id) {
    dispatch({ type: types.FETCH_AUTH, payload: { id: user.id } })
    dispatch({ type: types.FETCH_USER, payload: user })
  } else {
    dispatch({ type: types.FETCH_AUTH, payload: false })
  }
  return res.data
}
// Fetch user details
export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/users/id/${id}`)
  dispatch({ type: types.FETCH_USER, payload: res.data })
}

export const fetchNotifications = notifications => ({
  type: types.FETCH_NOTIFICATIONS,
  payload: notifications,
})

export const createComment = commentData => async dispatch => {
  dispatch({ type: types.CREATE_COMMENT, payload: commentData })
}

export const deleteComment = commentData => async dispatch => {
  dispatch({ type: types.DELETE_COMMENT, payload: commentData })
}

export const handlePostReactions = postData => async dispatch => {
  const { id, reaction, user_id } = postData
  await axios.post('/posts/reaction', {
    reaction,
    user_id,
    post_id: id,
  })
  switch (reaction) {
    case 'like':
      dispatch({ type: types.LIKE_POST, payload: postData })
      break
    case 'unlike':
      dispatch({ type: types.UNLIKE_POST, payload: postData })
      break
    case 'pony_up':
      dispatch({ type: types.PONY_UP, payload: postData })
      break
    case 'pony_down':
      dispatch({ type: types.PONY_DOWN, payload: postData })
    default:
      break
  }
}
