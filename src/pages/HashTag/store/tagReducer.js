import * as type from './tagActionTypes'

const initialState = {
  posts: [],
  isFollowing: null,
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TAG_POSTS:
      return { ...action.payload }
    default:
      return state
  }
}
