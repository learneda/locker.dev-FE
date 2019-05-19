import { FETCH_LOCKER } from '../actions/types'

export const lockerReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LOCKER:
      return [...action.payload]
    default:
      return state
  }
}
