import * as type from './tagActionTypes'
import axios from 'apis/axiosAPI'

export const fetchTagPosts = hashtag => async dispatch => {
  const posts = await axios.get(`/tags/${hashtag}`)
  if (posts.data.response) {
    console.log('fetchTagPosts response', posts)
    dispatch({ type: type.FETCH_TAG_POSTS, payload: posts.data.response })
  }
}

export const followTag = hashtag => async dispatch => {
  const status = await axios.post(`/tags/follow/${hashtag}`)
  if (status.data.msg === 'success') {
    dispatch({ type: type.FOLLOW_TAG, payload: true })
    dispatch({ type: type.ADD_TO_MY_TAGS, payload: { hashtag } })
  }
}

export const unfollowTag = hashtag => async dispatch => {
  const status = await axios.delete(`/tags/unfollow/${hashtag}`)
  if (status.data.msg === 'success') {
    dispatch({ type: type.UNFOLLOW_TAG, payload: false })
    dispatch({ type: type.REMOVE_FROM_MY_TAGS, payload: hashtag })
  }
}
