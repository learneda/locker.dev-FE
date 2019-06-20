import axios from 'apis/axiosAPI'
import * as type from './browseTypes'
import { selectRandom } from 'helpers'

//* Random topics array for initial fetch of Courses
const topics = [
  'javascript',
  'graphQL',
  'redux javascript',
  'react javascript',
  'node javascript',
  'sql',
  'vue javascript',
  'firebase',
]
//*** COURSES ***//
export const fetchCourses = (q, page) => async dispatch => {
  const pageStep = 1
  if (!q) {
    q = selectRandom(topics)
  }
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.FETCH_COURSES, payload: res.data.results })
  dispatch({ type: type.SET_COURSE_PAGE, payload: page + pageStep })
}
export const searchCourses = (q, page) => async dispatch => {
  const pageStep = 1
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.SEARCH_COURSES, payload: res.data.results })
  dispatch({ type: type.SET_COURSE_PAGE, payload: page + pageStep })
}
//*** ARTICLES ***//
export const fetchArticles = (q, offset) => async dispatch => {
  const offsetStep = 12
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.FETCH_ARTICLES, payload: res.data })
  dispatch({ type: type.SET_ARTICLE_OFFSET, payload: offset + offsetStep })
}
export const searchArticles = (q, offset) => async dispatch => {
  const offsetStep = 12
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.SEARCH_ARTICLES, payload: res.data })
  dispatch({ type: type.SET_ARTICLE_OFFSET, payload: offset + offsetStep })
}
//*** VIDEOS ***//
export const fetchVideos = (q, pageToken) => async dispatch => {
  if (!q) {
    q = selectRandom(topics)
  }
  const res = await axios.post('/youtube', { q, pageToken })

  // //* Adds isThumbnail property to each video; default to true
  const videosWithThumbnailState = res.data.items.map(video => {
    video.isThumbnail = true
    return video
  })
  dispatch({ type: type.FETCH_VIDEOS, payload: videosWithThumbnailState })
  dispatch({ type: type.SET_VIDEO_PAGETOKEN, payload: res.data.nextPageToken })
}
export const searchVideos = q => async dispatch => {
  const res = await axios.post('/youtube', { q })
  const videosWithThumbnailState = res.data.items.map(video => {
    video.isThumbnail = true
    return video
  })
  dispatch({ type: type.SEARCH_VIDEOS, payload: videosWithThumbnailState })
  dispatch({ type: type.SET_VIDEO_PAGETOKEN, payload: res.data.nextPageToken })
}
//* Sets isThumbnail to false to reveal iframe for video with id
export const showIframe = id => {
  return { type: type.SHOW_IFRAME, payload: { id } }
}
//* Resets all loaded iframes to thumbnails on Videos mount
export const resetIframe = () => {
  return { type: type.RESET_IFRAME }
}
//*** BOOKS ***//
export const fetchBooks = (q, offset) => async dispatch => {
  const offsetStep = 12
  if (!q) {
    q = selectRandom(topics)
  }
  const res = await axios.get(`/books/search`, {
    params: {
      q,
      offset,
    },
  })
  dispatch({ type: type.FETCH_BOOKS, payload: res.data })
  dispatch({ type: type.SET_BOOK_OFFSET, payload: offset + offsetStep })
}
export const searchBooks = (q, offset) => async dispatch => {
  const offsetStep = 12
  const res = await axios.get(`/books/search`, {
    params: {
      q,
      offset,
    },
  })
  dispatch({ type: type.SEARCH_BOOKS, payload: res.data })
  dispatch({ type: type.SET_BOOK_OFFSET, payload: offset + offsetStep })
}
//*** PODCASTS ***//
export const fetchPodcasts = (q, offset) => async dispatch => {
  if (!q) {
    q = selectRandom(topics)
  }
  const res = await axios.post('/listen', { q, offset })

  dispatch({ type: type.FETCH_PODCASTS, payload: res.data.results })
  dispatch({ type: type.SET_PODCAST_OFFSET, payload: res.data.next_offset })
}
export const searchPodcasts = (q, offset) => async dispatch => {
  const res = await axios.post('/listen', { q, offset })

  dispatch({ type: type.SEARCH_PODCASTS, payload: res.data.results })
  dispatch({ type: type.SET_PODCAST_OFFSET, payload: res.data.next_offset })
}
