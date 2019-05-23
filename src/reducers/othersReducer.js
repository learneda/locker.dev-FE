import {
  FETCH_OTHER_COLLECTION,
  FETCH_OTHER_FOLLOWING,
  FETCH_OTHER_FOLLOWERS,
  FETCH_OTHER_USER_DETAILS,
} from 'actions/types'

const initialState = {
  collections: [],
  following: [],
  followers: [],
  userDetails: null,
}

export const othersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OTHER_COLLECTION:
      return { ...state, collections: action.payload }
    case FETCH_OTHER_FOLLOWING:
      return { ...state, following: action.payload }
    case FETCH_OTHER_FOLLOWERS:
      return { ...state, followers: action.payload }
    case FETCH_OTHER_USER_DETAILS:
      return { ...state, userDetails: action.payload }
    default:
      return state
  }
}
