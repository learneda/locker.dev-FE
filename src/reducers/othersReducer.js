import { FETCH_OTHER_COLLECTION, FETCH_OTHER_FOLLOWING } from '../actions/types'

const initialState = {
  collections: [],
  following: [],
}

export const othersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OTHER_COLLECTION:
      return { ...state, collections: action.payload }
    case FETCH_OTHER_FOLLOWING:
      return { ...state, following: action.payload }
    default:
      return state
  }
}
