import * as type from './searchTypes'

const initialState = {
  searchTerm: '',
  isSearch: false,
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case type.RESET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case type.SET_SEARCH_OFF:
      return { ...state, isSearch: false }
    case type.SET_SEARCH_ON:
      return { ...state, isSearch: true }
    case type.TOGGLE_SEARCH:
      return { ...state, isSearch: !state.isSearch }
    default:
      return state
  }
}
