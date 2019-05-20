import {
  FETCH_FEED,
  TOGGLE_HAS_MORE,
  INCREMENT_OFFSET,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
} from '../actions/types'

const initialState = {
  posts: [],
  hasmore: true,
  offset: 0,
}
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED:
      return { ...state, posts: [...state.posts, ...action.payload] }
    case TOGGLE_HAS_MORE:
      return { ...state, hasmore: action.payload }
    case INCREMENT_OFFSET:
      return { ...state, offset: action.payload }
    case ADD_COMMENT:
      const updatedComments = state.posts.map(post => {
        if (post.post_id === action.payload.post_id) {
          post.comments.push(action.payload)
        }
        return post
      })
      return { ...state, posts: updatedComments }
    case DELETE_COMMENT:
      const newPosts = state.posts.map(post => {
        if (post.post_id === action.payload.post_id) {
          post.comments = post.comments.filter(
            comment => comment.id !== action.payload.id
          )
        }
        return post
      })
      return { ...state, posts: newPosts }
    case LIKE_COMMENT:
      const updateLikePosts = state.posts.map(post => {
        if (post.post_id === action.payload.post_id) {
          const likes = post.likes
          post.likes = likes + 1
        }
        return post
      })
      return { ...state, posts: updateLikePosts }
    default:
      return state
  }
}
