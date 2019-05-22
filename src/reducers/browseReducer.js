import {
  FETCH_COURSES,
  SEARCH_COURSES,
  SET_COURSE_PAGE,
  FETCH_ARTICLES,
  SEARCH_ARTICLES,
  SET_ARTICLE_OFFSET,
  FETCH_BOOKS,
  SEARCH_BOOKS,
  SET_BOOK_OFFSET,
  FETCH_VIDEOS,
  SEARCH_VIDEOS,
  SET_VIDEO_PAGETOKEN,
  FETCH_PODCASTS,
  SEARCH_PODCASTS,
  SET_PODCAST_OFFSET,
} from '../actions/types'

const initialState = {
  courses: [],
  articles: [],
  books: [],
  videos: [],
  podcasts: [],
  coursePage: 1,
  articleOffset: 0,
  bookOffset: 0,
  videoPageToken: null,
  podcastOffset: 0,
}
export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: [...state.courses, ...action.payload] }
    case FETCH_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.payload] }
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, ...action.payload] }
    case FETCH_VIDEOS:
      return { ...state, videos: [...state.videos, ...action.payload] }
    case FETCH_PODCASTS:
      return { ...state, podcasts: [...state.podcasts, ...action.payload] }
    case SEARCH_COURSES:
      return { ...state, courses: action.payload }
    case SEARCH_ARTICLES:
      return { ...state, articles: action.payload }
    case SEARCH_BOOKS:
      return { ...state, books: action.payload }
    case SEARCH_VIDEOS:
      return { ...state, videos: action.payload }
    case SEARCH_PODCASTS:
      return { ...state, podcasts: action.payload }
    case SET_COURSE_PAGE:
      return { ...state, coursePage: action.payload }
    case SET_ARTICLE_OFFSET:
      return { ...state, articleOffset: action.payload }
    case SET_BOOK_OFFSET:
      return { ...state, bookOffset: action.payload }
    case SET_VIDEO_PAGETOKEN:
      return { ...state, videoPageToken: action.payload }
    case SET_PODCAST_OFFSET:
      return { ...state, podcastPageToken: action.payload }
    default:
      return state
  }
}
