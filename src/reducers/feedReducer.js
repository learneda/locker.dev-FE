import { FETCH_FEED, TOGGLE_HAS_MORE, INCREMENT_OFFSET } from '../actions/types'

const initialState = {
  posts: [],
  hasmore: true,
  offset: 0,
}
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED:
      return { ...state, posts: [...state.posts, ...action.payload] }
    case TOGGLE_HAS_MORE:
      return { ...state, hasmore: action.payload }
    case INCREMENT_OFFSET:
      return { ...state, offset: action.payload }
    default:
      return state
  }
}
