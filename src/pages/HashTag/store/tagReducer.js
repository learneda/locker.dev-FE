import * as types from './tagTypes'

const initialState = {
  isFollowing: null,
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_TAG_POSTS:
      return { isFollowing: null }
    case types.RESET_POSTS:
      return { isFollowing: null }
    case types.FOLLOW_TAG:
      return { ...state, isFollowing: action.payload }
    case types.UNFOLLOW_TAG:
      return { ...state, isFollowing: action.payload }
    case types.SET_IS_FOLLOWING:
      return { ...state, isFollowing: action.payload }
    default:
      return state
  }
}
