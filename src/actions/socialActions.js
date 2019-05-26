import * as type from './socialTypes'
import axios from 'apis/axiosAPI'
//* Create a following on user input
export const followAUser = payload => async dispatch => {
  const res = await axios.post(`/users/subscribe`, payload)
  dispatch({ type: type.FOLLOW_A_USER, payload: res.data })
}
//* Delete a following on user input
export const unfollowAUser = payload => async dispatch => {
  const res = await axios.delete(`/users/unsubscribe`, {
    data: {
      user_id: payload.user_id,
      friend_id: Number(payload.friend_id),
    },
  })
  dispatch({ type: type.UNFOLLOW_A_USER, payload: res.data })
}
//* Fetch suggested on Home mount/user input
//TODO: Consider fixing the logic here
export const fetchSuggested = id => async dispatch => {
  const res = await axios.get(`/users/recommendedFollow?id=${id}`)
  dispatch({ type: type.FETCH_SUGGESTED, payload: res.data })
}
// fetch a userIds following list
export const fetchFollowing = id => async dispatch => {
  const following = await axios.get(`/users/following?id=${id}`)
  dispatch({ type: type.FETCH_FOLLOWING, payload: following.data })
}
// fetch a userIds followers list
export const fetchFollowers = id => async dispatch => {
  const followers = await axios.get(`/users/followers?id=${id}`)
  dispatch({ type: type.FETCH_FOLLOWERS, payload: followers.data })
}
