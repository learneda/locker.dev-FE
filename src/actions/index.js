import axios from 'axios'
import {
  FETCH_AUTH,
  FETCH_COURSES,
  SEARCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  FETCH_POSTS,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  SET_SEARCH_TERM,
  RESET_SEARCH_TERM,
  EDIT_USER,
  FETCH_USER,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  FETCH_SUGGESTED,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWING,
  FETCH_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  FETCH_LOCKER,
  FETCH_FEED,
  TOGGLE_HAS_MORE,
  INCREMENT_OFFSET,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  SET_COURSE_PAGE,
  SET_ARTICLE_OFFSET,
  SEARCH_ARTICLES,
  FETCH_COLLECTIONS,
  EDIT_COLLECTION,
  ADD_TO_FEED,
} from './types'

import { post as URL } from '../services/baseURL'
axios.defaults.withCredentials = true

export const fetchAuth = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`)
  dispatch({ type: FETCH_AUTH, payload: res.data })
}

export const fetchCourses = (q, page) => async dispatch => {
  const res = await axios.get(`${URL}/api/courses?page=${page}&search=${q}`)
  dispatch({ type: FETCH_COURSES, payload: res.data.results })
}

export const searchCourses = (q, page) => async dispatch => {
  const res = await axios.get(`${URL}/api/courses?page=${page}&search=${q}`)
  dispatch({ type: SEARCH_COURSES, payload: res.data.results })
}

export const fetchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`${URL}/api/articles?offset=${offset}`)
  } else {
    res = await axios.get(`${URL}/api/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: FETCH_ARTICLES, payload: res.data })
}

export const searchArticles = (q, offset) => async dispatch => {
  let res
  if (!q) {
    res = await axios.get(`${URL}/api/articles?offset=${offset}`)
  } else {
    res = await axios.get(`${URL}/api/articles?q=${q}&offset=${offset}`)
  }
  dispatch({ type: SEARCH_ARTICLES, payload: res.data })
}
export const authModalToggle = () => ({ type: AUTH_MODAL_TOGGLE })

export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP })

export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN })

// get all user collections
export const fetchCollections = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts`)
  dispatch({ type: FETCH_COLLECTIONS, payload: res.data })
}

export const createCollection = post => async dispatch => {
  let msg
  try {
    const res = await axios.post(`${URL}/api/posts`, post)
    dispatch({ type: CREATE_COLLECTION, payload: res.data })
    msg = 'success'
  } catch (err) {
    console.log(err)
    msg = 'whoops!'
  } finally {
    return new Promise(function(resolve, reject) {
      resolve(msg)
    })
  }
}

export const deleteCollection = id => async dispatch => {
  const res = await axios.delete(`${URL}/api/posts/${id}`)
  dispatch({ type: DELETE_COLLECTION, payload: res.data })
}

export const editCollection = editedCollection => async dispatch => {
  const collection = await axios.put(
    `${URL}/api/posts/${editedCollection.id}`,
    editedCollection
  )
  if (collection) {
    dispatch({ type: EDIT_COLLECTION, payload: collection.data })
  }
}

export const editProfile = (id, profile) => async dispatch => {
  const res = await axios.put(`${URL}/api/users/edit`, { id, ...profile })
  dispatch({ type: EDIT_USER, payload: res.data })
}

export const shareCollection = collection => async dispatch => {
  // edit collection
  const editCollection = await axios.put(
    `${URL}/api/posts/${collection.id}`,
    collection
  )
  if (editCollection) {
    dispatch({ type: EDIT_COLLECTION, payload: editCollection.data })
    // insert new record to newfeed table
    await axios.post(`${URL}/api/posts/share`, {
      id: collection.id,
      user_id: editCollection.data.user_id,
    })

    const sharedCollection = editCollection.data

    // feed post's are exprecting to have these to properites on them
    sharedCollection['comments'] = []
    sharedCollection['likes'] = 0
    dispatch({ type: ADD_TO_FEED, payload: sharedCollection })
  }
}

export const setSearchTerm = e => ({
  type: SET_SEARCH_TERM,
  payload: e.target.value,
})

export const resetSearchTerm = () => ({
  type: RESET_SEARCH_TERM,
  payload: '',
})

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/id/${id}`)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const followAUser = payload => async dispatch => {
  const res = await axios.post(`${URL}/api/users/subscribe`, payload)
  dispatch({ type: FOLLOW_A_USER, payload: res.data })
}

export const unfollowAUser = payload => async dispatch => {
  const res = await axios.delete(`${URL}/api/users/unsubscribe`, {
    data: {
      user_id: payload.user_id,
      friend_id: Number(payload.friend_id),
    },
  })
  dispatch({ type: UNFOLLOW_A_USER, payload: res.data })
}

export const fetchSuggested = id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/recommendedFollow?id=${id}`)
  dispatch({ type: FETCH_SUGGESTED, payload: res.data })
}

// fetch a userIds following list
export const fetchFollowing = id => async dispatch => {
  const following = await axios.get(`${URL}/api/users/following?id=${id}`)
  dispatch({ type: FETCH_FOLLOWING, payload: following.data })
}

// fetch a userIds followers list
export const fetchFollowers = id => async dispatch => {
  const followers = await axios.get(`${URL}/api/users/followers?id=${id}`)
  dispatch({ type: FETCH_FOLLOWERS, payload: followers.data })
}

export const populateNotifications = NotificationsArr => ({
  type: FETCH_NOTIFICATIONS,
  payload: NotificationsArr,
})

export const readNotifications = () => async dispatch => {
  await axios.post(`${URL}/api/notifications/read`)
}

export const deleteNotifications = () => async dispatch => {
  await axios.delete(`${URL}/api/notifications/clear`)
  dispatch({ type: CLEAR_NOTIFICATIONS })
}

export const fetchLocker = () => async dispatch => {
  const lockerData = await axios.get(`${URL}/api/locker`)
  if (lockerData.data.length) {
    dispatch({ type: FETCH_LOCKER, payload: lockerData.data })
  }
}
// initial action creator to fetch newsfeed
export const fetchFeed = () => async dispatch => {
  const newsFeed = await axios.get(`${URL}/api/users/newsfeed?offset=0`)
  if (newsFeed.data.length) {
    dispatch({ type: FETCH_FEED, payload: newsFeed.data })
  }
}

// InfiniteScroll component will call this func with offset to get next posts
export const subsequentFetchFeed = offset => async dispatch => {
  // offset flow => 0, 5, 10 . offset will be incremented by +5 for everytime it is called
  const newsFeed = await axios.get(`${URL}/api/users/newsfeed?offset=${offset}`)
  // if the response's data array is populated ?
  if (newsFeed.data.length) {
    // set the array with new posts as payload
    dispatch({ type: FETCH_FEED, payload: newsFeed.data })
    // increment the offset by 5
    dispatch({ type: INCREMENT_OFFSET, payload: offset + 5 })
  } else {
    // else toggle hasMore state to false so InfiniteScroll can stop calling subsequentFetchFeed
    // InfiniteScroll will unmount Loading component when hasMore boolean is false
    dispatch({ type: TOGGLE_HAS_MORE, payload: false })
  }
}

export const createComment = commentData => async dispatch => {
  console.log(commentData)
  dispatch({ type: ADD_COMMENT, payload: commentData })
}

export const deleteComment = commentData => async dispatch => {
  dispatch({ type: DELETE_COMMENT, payload: commentData })
}

export const likeComment = commentData => async dispatch => {
  console.log(commentData)
  dispatch({ type: LIKE_COMMENT, payload: commentData })
}

export const unlikeComment = commentData => async dispatch => {
  dispatch({ type: UNLIKE_COMMENT, payload: commentData })
}

export const setCoursePage = page => ({
  type: SET_COURSE_PAGE,
  payload: page,
})

export const setArticleOffset = offset => ({
  type: SET_ARTICLE_OFFSET,
  payload: offset,
})
