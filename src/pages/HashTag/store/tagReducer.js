import * as type from './tagActionTypes'
import * as appType from '../../../appTypes'

const initialState = {
  posts: [],
  isFollowing: null,
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TAG_POSTS:
      return { ...action.payload }
    case appType.CREATE_COMMENT:
      // mapping thru each post in posts arr
      // payload will be the comment obj that contains which post it belongs to
      const updatedComments = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.id === action.payload.post_id) {
          // push the comment obj into that post's comment arr
          post.comments.push(action.payload)
        }
        return post
      })
      return { ...state, posts: updatedComments }
    case appType.DELETE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to
      const newPosts = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.id === action.payload.post_id) {
          // filter out that comment obj
          post.comments = post.comments.filter(
            comment => comment.id !== action.payload.id
          )
        }
        return post
      })
      return { ...state, posts: newPosts }
    case appType.LIKE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to & how many like it has
      const updateLikePosts = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // increment post likes
          post.likes = post.likes + 1
        }
        return post
      })
      return { ...state, posts: updateLikePosts }
    case appType.UNLIKE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to & how many like it has

      const unlikeComment = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // decrement post likes
          post.likes = post.likes - 1
        }
        return post
      })
      return { ...state, posts: unlikeComment }
    case appType.PONY_UP:
      const ponyUp = state.posts.map(post => {
        if (post.post_id === action.payload.post_id) {
          post.ponyCount = post.ponyCount + 1
        }
        return post
      })
      return { ...state, posts: ponyUp }
    case appType.PONY_DOWN:
      const ponyDown = state.posts.map(post => {
        if (post.post_id === action.payload.post_id) {
          post.ponyCount = post.ponyCount - 1
        }
        return post
      })
      return { ...state, posts: ponyDown }
    default:
      return state
  }
}
