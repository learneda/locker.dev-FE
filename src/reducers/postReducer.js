import {
  FETCH_POSTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POSTS_STATE,
} from '../actions/types'

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload
    case CREATE_POST:
      return [...state, action.payload]
    case DELETE_POST:
      return state.filter(
        collection => collection.id !== action.payload.deletedRecord.id
      )
    case UPDATE_POSTS_STATE:
      return [...state, action.payload]
    default:
      return state
  }
}
