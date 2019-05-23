import {
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  FETCH_SUGGESTED,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWING,
} from 'actions/types'

const initialState = {
  suggested: [],
  followers: [],
  following: [],
}

export const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_A_USER:
      return { ...state }
    case UNFOLLOW_A_USER:
      return { ...state }
    case FETCH_SUGGESTED:
      return { ...state, suggested: action.payload }
    case FETCH_FOLLOWERS:
      return { ...state, followers: action.payload }
    case FETCH_FOLLOWING:
      return { ...state, following: action.payload }
    default:
      return state
  }
}
