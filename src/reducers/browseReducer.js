import {
  FETCH_COURSES,
  FETCH_ARTICLES,
  SET_COURSE_PAGE,
  SET_ARTICLE_OFFSET,
  SEARCH_ARTICLES,
  SEARCH_COURSES,
} from '../actions/types'

const initialState = {
  courses: [],
  articles: [],
  coursePage: 1,
  articleOffset: 0,
}
export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: state.courses.concat(action.payload) }
    case FETCH_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.payload] }
    case SET_COURSE_PAGE:
      return { ...state, coursePage: action.payload }
    case SET_ARTICLE_OFFSET:
      return { ...state, articleOffset: action.payload }
    case SEARCH_ARTICLES:
      return { ...state, articles: action.payload }
    case SEARCH_COURSES:
      return { ...state, courses: action.payload }
    default:
      return state
  }
}
