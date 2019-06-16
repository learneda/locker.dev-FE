import * as type from './searchTypes'

const initialState = ''

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_SEARCH_TERM:
      return action.payload
    case type.RESET_SEARCH_TERM:
      return action.payload
    default:
      return state
  }
}
