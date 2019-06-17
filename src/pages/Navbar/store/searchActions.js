import * as type from './searchTypes'

//* Sets search term on user input
export const setSearchTerm = e => ({
  type: type.SET_SEARCH_TERM,
  payload: e.target.value,
})
//* Resets search on user input
export const resetSearchTerm = () => ({
  type: type.RESET_SEARCH_TERM,
  payload: '',
})
//* Set mini-search off on user input
export const setSearchOff = () => ({
  type: type.SET_SEARCH_OFF,
})
//* Set mini-search on on user input
export const setSearchON = () => ({
  type: type.SET_SEARCH_ON,
})
//* Toggle mini-search on on user input
export const toggleSearch = () => ({
  type: type.TOGGLE_SEARCH,
})
