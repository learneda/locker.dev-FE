import * as type from './tagActionTypes'
import axios from 'apis/axiosAPI'

export const fetchTagPosts = (hashtag, offset) => async dispatch => {
  const posts = await axios.get(`/tags/${hashtag}?offset=${offset}`)
  dispatch({
    type: 'SET_IS_FOLLOWING',
    payload: posts.data.response.isFollowing,
  })
  if (posts.data.response.posts.length) {
    dispatch({ type: 'FETCH_MORE_FEED', payload: posts.data.response.posts })
    dispatch({ type: 'INCREMENT_OFFSET', payload: offset + 5 })
  } else {
    dispatch({ type: 'TOGGLE_HAS_MORE', payload: false })
  }
}

export const followTag = hashtag => async dispatch => {
  const status = await axios.post(`/tags/follow/${hashtag}`)

  if (status.data.msg === 'success') {
    dispatch({ type: type.FOLLOW_TAG, payload: true })
    dispatch({ type: type.ADD_TO_MY_TAGS, payload: status.data.hashtag })
  }
}

export const unfollowTag = hashtag => async dispatch => {
  const status = await axios.delete(`/tags/unfollow/${hashtag}`)
  if (status.data.msg === 'success') {
    dispatch({ type: type.UNFOLLOW_TAG, payload: false })
    console.log(status.data.hashtag)
    dispatch({ type: type.REMOVE_FROM_MY_TAGS, payload: status.data.hashtag })
  }
}
