import * as type from './profileTypes'
import axios from 'apis/axiosAPI'

export const fetchProfileCollections = id => async dispatch => {
  try {
    const collections = await axios.get(`/posts/all/${id}`)
    if (collections) {
      dispatch({
        type: type.FETCH_PROFILE_COLLECTION,
        payload: collections.data,
      })
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
