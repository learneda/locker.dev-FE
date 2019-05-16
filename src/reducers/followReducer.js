import {
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from '../actions/types'

const initialState = {
  suggestedFriends: [],
  userFollowers: [],
  userFollowing: [],
  following: false,
}

export const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_AND_FOLLOWING_COUNT:
      return { ...state, ...action.payload }
    case FOLLOW_A_USER:
      return { ...state }
    case UNFOLLOW_A_USER:
      return state
    case GET_FOLLOWING:
      return { ...state, following: action.payload }
    case RECOMMENDED_FOLLOW:
      return { ...state, suggestedFriends: action.payload }
    case GET_USER_FOLLOWERS:
      return { ...state, userFollowers: action.payload }
    case GET_USER_FOLLOWING:
      return { ...state, userFollowing: action.payload }
    default:
      return state
  }
}
