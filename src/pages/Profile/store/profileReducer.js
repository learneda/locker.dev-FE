import * as type from './profileTypes'

const initialState = {
  posts: [],
  following: [],
  followers: [],
  other: null,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_PROFILE_POSTS:
      return { ...state, posts: action.payload }
    case type.FETCH_PROFILE_FOLLOWING:
      return { ...state, following: action.payload }
    case type.FETCH_PROFILE_FOLLOWERS:
      return { ...state, followers: action.payload }
    case type.FETCH_PROFILE_DETAILS:
      return { ...state, other: action.payload }
    case type.RESET_PROFILE:
      return initialState
    default:
      return state
  }
}
