import { FETCH_COURSES, FETCH_ARTICLES, ERROR } from '../actions/types'

const initialState = {
  courses: [],
  articles: [],
}
export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: state.courses.concat(action.payload) }
    case FETCH_ARTICLES:
      return { ...state, articles: [...action.payload] }
    default:
      return state
  }
}
