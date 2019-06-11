import * as type from './homeTypes'
import axios from 'apis/axiosAPI'

export const fetchLocker = () => async dispatch => {
  const lockerData = await axios.get(`/locker`)
  if (lockerData.data.length) {
    dispatch({ type: type.FETCH_LOCKER, payload: lockerData.data })
  }
}
// initial action creator to fetch newsfeed
export const fetchFeed = () => async dispatch => {
  const newsFeed = await axios.get(`/users/newsfeed?offset=0`)
  if (newsFeed.data.length) {
    dispatch({ type: type.FETCH_FEED, payload: newsFeed.data })
  }
  if (newsFeed.data.length < 5) {
    dispatch({ type: type.TOGGLE_HAS_MORE, payload: false })
  }
}

// InfiniteScroll component will call this func with offset to get next posts
export const fetchMoreFeed = offset => async dispatch => {
  // offset flow => 0, 5, 10 . offset will be incremented by +5 for everytime it is called
  const newsFeed = await axios.get(`/users/newsfeed?offset=${offset}`)
  // if the response's data array is populated ?
  if (newsFeed.data.length) {
    // set the array with new posts as payload
    dispatch({ type: type.FETCH_FEED, payload: newsFeed.data })
    // increment the offset by 5
    dispatch({ type: type.INCREMENT_OFFSET, payload: offset + 5 })
  } else {
    // else toggle hasMore state to false so InfiniteScroll can stop calling fetchMoreFeed
    // InfiniteScroll will unmount Loading component when hasMore boolean is false
    dispatch({ type: type.TOGGLE_HAS_MORE, payload: false })
  }
}
