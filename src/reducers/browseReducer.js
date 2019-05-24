import {
  FETCH_COURSES,
  FETCH_ARTICLES,
  FETCH_VIDEOS,
  FETCH_BOOKS,
  FETCH_PODCASTS,
  SEARCH_COURSES,
  SEARCH_ARTICLES,
  SEARCH_VIDEOS,
  SEARCH_BOOKS,
  SEARCH_PODCASTS,
  SET_COURSE_PAGE,
  SET_ARTICLE_OFFSET,
  SET_BOOK_OFFSET,
  SET_VIDEO_PAGETOKEN,
  SET_PODCAST_OFFSET,
  SHOW_IFRAME,
  RESET_IFRAME,
} from 'actions/types'

const initialState = {
  courses: [],
  articles: [],
  books: [],
  videos: [],
  podcasts: [],
  coursePage: 1,
  articleOffset: 0,
  bookOffset: 0,
  podcastOffset: 0,
  videoPageToken: null,
}

export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return { ...state, courses: [...state.courses, ...action.payload] }
    case FETCH_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.payload] }
    case FETCH_VIDEOS:
      return { ...state, videos: [...state.videos, ...action.payload] }
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, ...action.payload] }
    case FETCH_PODCASTS:
      return { ...state, podcasts: [...state.podcasts, ...action.payload] }
    case SEARCH_COURSES:
      return { ...state, courses: action.payload }
    case SEARCH_ARTICLES:
      return { ...state, articles: action.payload }
    case SEARCH_VIDEOS:
      return { ...state, videos: action.payload }
    case SEARCH_BOOKS:
      return { ...state, books: action.payload }
    case SEARCH_PODCASTS:
      return { ...state, podcasts: action.payload }
    case SET_COURSE_PAGE:
      return { ...state, coursePage: action.payload }
    case SET_ARTICLE_OFFSET:
      return { ...state, articleOffset: action.payload }
    case SET_VIDEO_PAGETOKEN:
      return { ...state, videoPageToken: action.payload }
    case SET_BOOK_OFFSET:
      return { ...state, bookOffset: action.payload }
    case SET_PODCAST_OFFSET:
      return { ...state, podcastOffset: action.payload }
    case SHOW_IFRAME:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id.videoId === action.payload.id) {
            video.isThumbnail = false
          }
          return video
        }),
      }
    case RESET_IFRAME:
      return {
        ...state,
        videos: state.videos.map(video => {
          video.isThumbnail = true
          return video
        }),
      }
    default:
      return state
  }
}
