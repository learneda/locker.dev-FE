import * as type from './tagActionTypes'
import * as appType from 'App/appTypes'

const initialState = {
  isFollowing: null,
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RESET_TAG_POSTS:
      return { isFollowing: null }
    case 'RESET_POSTS':
      return { isFollowing: null }
    case type.FOLLOW_TAG:
      return { ...state, isFollowing: action.payload }
    case type.UNFOLLOW_TAG:
      return { ...state, isFollowing: action.payload }
    case 'SET_IS_FOLLOWING':
      return { ...state, isFollowing: action.payload }
    default:
      return state
  }
}
