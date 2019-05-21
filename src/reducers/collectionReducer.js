import {
  FETCH_COLLECTIONS,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
} from '../actions/types'

export const collectionReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return action.payload
    case CREATE_COLLECTION:
      return [...state, action.payload]
    case DELETE_COLLECTION:
      return state.filter(
        collection => collection.id !== action.payload.deletedRecord.id
      )
    default:
      return state
  }
}
