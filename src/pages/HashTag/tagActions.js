import * as type from './tagActionTypes'
import axios from 'apis/axiosAPI'

export const fetchTagPosts = hashtag => async dispatch => {
  const posts = await axios.get(`/tags/${hashtag}`)
  if (posts.data.response) {
    console.log('fetchTagPosts response', posts)
    dispatch({ type: type.FETCH_TAG_POSTS, payload: posts.data.response })
  }
}
