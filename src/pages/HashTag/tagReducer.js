import * as type from './tagActionTypes'

const initialState = {
  posts: [],
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TAG_POSTS:
      return { posts: [...action.payload] }
    default:
      return state
  }
}
