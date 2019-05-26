import axios from 'apis/axiosAPI'
import youtube from 'apis/youtube'
import listen from 'apis/listen'
import * as type from './browseTypes'

//* Fetches courses on Browse mount
export const fetchCourses = (q, page) => async dispatch => {
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.FETCH_COURSES, payload: res.data.results })
}
//* Fetches articles on Browse mount
export const fetchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.FETCH_ARTICLES, payload: res.data })
}
//* Fetches videos on Browse mount
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
//* Fetches books on Browse mount
export const fetchBooks = (query, offset) => async dispatch => {
  const res = await axios.get(`/books/search`, {
    params: {
      q: query || 'javascript',
      offset,
    },
  })
  dispatch({ type: type.FETCH_BOOKS, payload: res.data })
}
//* Fetches podcasts on Browse mount
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
//* Searches courses on user input
export const searchCourses = (q, page) => async dispatch => {
  const res = await axios.get(`/courses?page=${page}&search=${q}`)
  dispatch({ type: type.SEARCH_COURSES, payload: res.data.results })
}
//* Search articles on user input
export const searchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`/articles?offset=${offset}`)
  } else {
    res = await axios.get(`/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: type.SEARCH_ARTICLES, payload: res.data })
}
//* Search videos on user input
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
//* Search books on user input
export const searchBooks = (query, offset) => async dispatch => {
  const res = await axios.get(`/books/search`, {
    params: {
      q: query || 'javascript',
      offset,
    },
  })
  dispatch({ type: type.SEARCH_BOOKS, payload: res.data })
}
//* Search podcasts on user input
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
//* Set course page for pagination
export const setCoursePage = page => ({
  type: type.SET_COURSE_PAGE,
  payload: page,
})
//* Set article offset for pagination
export const setArticleOffset = offset => ({
  type: type.SET_ARTICLE_OFFSET,
  payload: offset,
})
//* Set book offset for pagination
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
