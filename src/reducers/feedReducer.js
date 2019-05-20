import { FETCH_FEED, TOGGLE_HAS_MORE } from '../actions/types'

const initialState = {
  feed: [],
  hasmore: true,
}
export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED:
      state.feed = [...action.payload, ...state.feed]
      return state
      break
    case TOGGLE_HAS_MORE:
      state.hasmore = action.payload
      return state
      break
    default:
      return state
      break
  }
}
