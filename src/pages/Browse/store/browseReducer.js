import * as type from './browseTypes'

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
    case type.FETCH_ARTICLES:
      return { ...state, articles: [...state.articles, ...action.payload] }
    case type.FETCH_COURSES:
      return { ...state, courses: [...state.courses, ...action.payload] }
    case type.FETCH_VIDEOS:
      return { ...state, videos: [...state.videos, ...action.payload] }
    case type.FETCH_PODCASTS:
      return { ...state, podcasts: [...state.podcasts, ...action.payload] }
    case type.FETCH_BOOKS:
      return { ...state, books: [...state.books, ...action.payload] }
    case type.SEARCH_ARTICLES:
      return { ...state, articles: action.payload }
    case type.SEARCH_COURSES:
      return { ...state, courses: action.payload }
    case type.SEARCH_VIDEOS:
      return { ...state, videos: action.payload }
    case type.SEARCH_PODCASTS:
      return { ...state, podcasts: action.payload }
    case type.SEARCH_BOOKS:
      return { ...state, books: action.payload }
    case type.SET_ARTICLE_OFFSET:
      return { ...state, articleOffset: action.payload }
    case type.SET_COURSE_PAGE:
      return { ...state, coursePage: action.payload }
    case type.SET_VIDEO_PAGETOKEN:
      return { ...state, videoPageToken: action.payload }
    case type.SET_PODCAST_OFFSET:
      return { ...state, podcastOffset: action.payload }
    case type.SET_BOOK_OFFSET:
      return { ...state, bookOffset: action.payload }
    case type.SHOW_IFRAME:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id.videoId === action.payload.id) {
            video.isThumbnail = false
          }
          return video
        }),
      }
    case type.RESET_IFRAME:
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
