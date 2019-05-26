import * as type from './profileTypes'

const initialState = {
  collections: [],
  following: [],
  followers: [],
  other: null,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_PROFILE_COLLECTION:
      return { ...state, collections: action.payload }
    case type.FETCH_PROFILE_FOLLOWING:
      return { ...state, following: action.payload }
    case type.FETCH_PROFILE_FOLLOWERS:
      return { ...state, followers: action.payload }
    case type.FETCH_PROFILE_DETAILS:
      return { ...state, other: action.payload }
    default:
      return state
  }
}
