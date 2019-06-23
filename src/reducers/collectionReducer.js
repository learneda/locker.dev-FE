import {
  FETCH_COLLECTIONS,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  EDIT_COLLECTION,
} from 'actions/types'

export const collectionReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return action.payload
    case CREATE_COLLECTION:
      return [action.payload, ...state]
    case DELETE_COLLECTION:
      return state.filter(
        collection => collection.id !== action.payload.deletedRecord.id
      )
    case EDIT_COLLECTION:
      return state.map(collection => {
        if (collection.id === action.payload.id) {
          collection = action.payload
        }
        return collection
      })
    default:
      return state
  }
}
