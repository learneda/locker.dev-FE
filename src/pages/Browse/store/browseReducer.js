import * as types from './browseTypes'

const initialState = {
  articles: [],
  courses: [],
  videos: [],
  podcasts: [],
  books: [],
  articleOffset: 0,
  coursePage: 1,
  videoPageToken: '',
  podcastOffset: 0,
  bookOffset: 0,
}

export const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.payload] }
    case types.FETCH_COURSES:
      return { ...state, courses: [...state.courses, ...action.payload] }
    case types.FETCH_VIDEOS:
      return { ...state, videos: [...state.videos, ...action.payload] }
    case types.FETCH_PODCASTS:
      return { ...state, podcasts: [...state.podcasts, ...action.payload] }
    case types.FETCH_BOOKS:
      return { ...state, books: [...state.books, ...action.payload] }
    case types.SEARCH_ARTICLES:
      return { ...state, articles: action.payload }
    case types.SEARCH_COURSES:
      return { ...state, courses: action.payload }
    case types.SEARCH_VIDEOS:
      return { ...state, videos: action.payload }
    case types.SEARCH_PODCASTS:
      return { ...state, podcasts: action.payload }
    case types.SEARCH_BOOKS:
      return { ...state, books: action.payload }
    case types.SET_ARTICLE_OFFSET:
      return { ...state, articleOffset: action.payload }
    case types.SET_COURSE_PAGE:
      return { ...state, coursePage: action.payload }
    case types.SET_VIDEO_PAGETOKEN:
      return { ...state, videoPageToken: action.payload }
    case types.SET_PODCAST_OFFSET:
      return { ...state, podcastOffset: action.payload }
    case types.SET_BOOK_OFFSET:
      return { ...state, bookOffset: action.payload }
    case types.SHOW_IFRAME:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id.videoId === action.payload.id) {
            video.isThumbnail = false
          }
          return video
        }),
      }
    case types.RESET_IFRAME:
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
