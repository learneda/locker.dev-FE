import axios from 'apis/axiosAPI'
import * as types from './socialTypes'
// Create a following on user input
export const followAUser = payload => async dispatch => {
  const res = await axios.post(`/users/subscribe`, payload)
  dispatch({ type: types.FOLLOW_A_USER, payload: res.data })
}
// Delete a following on user input
export const unfollowAUser = payload => async dispatch => {
  const res = await axios.delete(`/users/unsubscribe`, {
    data: {
      user_id: payload.user_id,
      friend_id: Number(payload.friend_id),
    },
  })
  dispatch({ type: types.UNFOLLOW_A_USER, payload: res.data })
}
// Fetch Suggested on Home mount/user input
//TODO: Consider fixing the logic here
export const fetchSuggested = id => async dispatch => {
  const res = await axios.get(`/users/recommendedFollow?id=${id}`)
  dispatch({ type: types.FETCH_SUGGESTED, payload: res.data })
}
// fetch a Users following list
export const fetchFollowing = id => async dispatch => {
  const following = await axios.get(`/users/following?id=${id}`)
  dispatch({ type: types.FETCH_FOLLOWING, payload: following.data })
}
// fetch a Users followers list
export const fetchFollowers = id => async dispatch => {
  const followers = await axios.get(`/users/followers?id=${id}`)
  dispatch({ type: types.FETCH_FOLLOWERS, payload: followers.data })
}

export const fetchPostCount = id => async dispatch => {
  const count = await axios.get(`users/posts/${id}`)

  dispatch({ type: types.FETCH_POSTS_COUNT, payload: count.data.count })
}
