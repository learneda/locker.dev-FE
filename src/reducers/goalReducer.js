import * as types from 'actions/goalTypes'

export const goalReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GOALS:
      return action.payload
    case types.CREATE_GOAL:
      return [...state, action.payload]
    case types.DELETE_GOAL:
      return state.filter(goal => goal.id !== action.payload.id)
    default:
      return state
  }
}
