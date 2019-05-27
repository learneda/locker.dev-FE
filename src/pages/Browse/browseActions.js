import axios from 'apis/axiosAPI'
import youtube from 'apis/youtube'
import listen from 'apis/listen'
import * as type from './browseTypes'
import { selectRandom } from 'helpers'

//* Random topics array for initial fetch of Courses
const topics = [
  'Javascript',
  'GraphQL',
  'Redux',
  'React',
  'Node',
  'SQL',
  'Vue',
  'Firebase',
]
//*** COURSES
export const fetchCourses = (q, page) => async dispatch => {
  if (!q) {
    q = selectRandom(topics)
  }
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.FETCH_COURSES, payload: res.data.results })
  dispatch({ type: type.SET_COURSE_PAGE, payload: page + 1 })
}
export const searchCourses = (q, page) => async dispatch => {
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.SEARCH_COURSES, payload: res.data.results })
  dispatch({ type: type.SET_COURSE_PAGE, payload: page + 1 })
}
//* Fetch Articles on Browse mount
export const fetchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.FETCH_ARTICLES, payload: res.data })
}
//* Fetch Videos on Browse mount
export const fetchVideos = (query, pageToken) => async dispatch => {
  const res = await youtube.get('/search', {
    params: {
      q: query || 'javascript',
      pageToken,
    },
  })
  const videosWithThumbnailState = res.data.items.map(video => {
    video.isThumbnail = true
    return video
  })
  dispatch({ type: type.FETCH_VIDEOS, payload: videosWithThumbnailState })
  dispatch({ type: type.SET_VIDEO_PAGETOKEN, payload: res.data.nextPageToken })
}
//* Fetch Books on Browse mount
export const fetchBooks = (query, offset) => async dispatch => {
  const res = await axios.get(`/books/search`, {
    params: {
      q: query || 'javascript',
      offset,
    },
  })
  dispatch({ type: type.FETCH_BOOKS, payload: res.data })
}
//* Fetch Podcasts on Browse mount
export const fetchPodcasts = (query, offset) => async dispatch => {
  const res = await listen.get('/search', {
    params: {
      q: query || 'javascript',
      offset,
    },
  })
  dispatch({ type: type.FETCH_PODCASTS, payload: res.data.results })
  dispatch({
    type: type.SET_PODCAST_OFFSET,
    payload: res.data.next_offset,
  })
}
//* Search Articles on user input
export const searchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.SEARCH_ARTICLES, payload: res.data })
}
//* Search Videos on user input
export const searchVideos = query => async dispatch => {
  const res = await youtube.get('/search', {
    params: {
      q: query || 'javascript',
    },
  })
  const videosWithThumbnailState = res.data.items.map(video => {
    video.isThumbnail = true
    return video
  })
  dispatch({ type: type.SEARCH_VIDEOS, payload: videosWithThumbnailState })
  dispatch({ type: type.SET_VIDEO_PAGETOKEN, payload: res.data.nextPageToken })
}
//* Search Books on user input
export const searchBooks = (query, offset) => async dispatch => {
  const res = await axios.get(`/books/search`, {
    params: {
      q: query || 'javascript',
      offset,
    },
  })
  dispatch({ type: type.SEARCH_BOOKS, payload: res.data })
}
//* Search Podcasts on user input
export const searchPodcasts = query => async dispatch => {
  const res = await listen.get('/search', {
    params: {
      q: query || 'javascript',
      offset: 0,
    },
  })
  dispatch({ type: type.SEARCH_PODCASTS, payload: res.data.results })
  dispatch({
    type: type.SET_PODCAST_OFFSET,
    payload: res.data.next_offset,
  })
}
//* Set ArticleOffset for pagination
export const setArticleOffset = offset => ({
  type: type.SET_ARTICLE_OFFSET,
  payload: offset,
})
//* Set BookOffset for pagination
export const setBookOffset = offset => ({
  type: type.SET_BOOK_OFFSET,
  payload: offset,
})
//* Switches video_thumbnail into iframe
export const showIframe = id => {
  return { type: type.SHOW_IFRAME, payload: { id } }
}
//* Resets all iframes to video_thumbnail
export const resetIframe = () => {
  return { type: type.RESET_IFRAME }
}
