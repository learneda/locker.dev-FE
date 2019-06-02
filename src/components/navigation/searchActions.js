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
