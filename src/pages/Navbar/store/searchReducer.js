import * as types from './searchTypes'

const initialState = {
  searchTerm: '',
  isSearch: false,
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case types.RESET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case types.SET_SEARCH_OFF:
      return { ...state, isSearch: false }
    case types.SET_SEARCH_ON:
      return { ...state, isSearch: true }
    case types.TOGGLE_SEARCH:
      return { ...state, isSearch: !state.isSearch }
    default:
      return state
  }
}
