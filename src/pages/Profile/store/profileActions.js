import * as type from './profileTypes'
import axios from 'apis/axiosAPI'

export const fetchProfileCollections = (id, offset) => async dispatch => {
  try {
    const posts = await axios.get(`/newsfeed/profile/${id}?offset=${offset}`)
    if (posts.data.newsFeed.length) {
      dispatch({
        type: 'FETCH_MORE_FEED',
        payload: posts.data.newsFeed,
      })
      dispatch({ type: 'INCREMENT_OFFSET', payload: Number(offset) + 5 })
    } else {
      dispatch({ type: 'TOGGLE_HAS_MORE', payload: false })
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchProfileFollowing = id => async dispatch => {
  try {
    const following = await axios.get(`/users/following?id=${id}`)
    if (following) {
      dispatch({ type: type.FETCH_PROFILE_FOLLOWING, payload: following.data })
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchProfileFollowers = id => async dispatch => {
  try {
    const followers = await axios.get(`/users/followers?id=${id}`)
    if (followers) {
      dispatch({ type: type.FETCH_PROFILE_FOLLOWERS, payload: followers.data })
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchProfileDetails = id => async dispatch => {
  try {
    const userDetails = await axios.get(`/users/id/${id}`)
    if (userDetails) {
      dispatch({ type: type.FETCH_PROFILE_DETAILS, payload: userDetails.data })
    }
  } catch (err) {
    console.log(err)
  }
}

export const resetProfile = () => {
  return { type: type.RESET_PROFILE }
}
