import { FETCH_COURSES, FETCH_ARTICLES, ERROR } from '../actions/types'

const initialState = {
  courses: [],
  articles: [],
  error: null,
}
export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: state.courses.concat(action.payload) }
    case FETCH_ARTICLES:
      return { ...state, articles: [...action.payload] }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
