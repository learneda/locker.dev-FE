import * as type from './tagActionTypes'
import * as appType from '../../../appTypes'

const initialState = {
  posts: [],
  isFollowing: null,
}

export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RESET_TAG_POSTS:
      return initialState
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
