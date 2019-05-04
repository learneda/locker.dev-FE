import axios from 'axios';
import {
  FETCH_USER,
  FETCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  SAVE_LINK,
  FETCH_POSTS,
  DELETE_POST,
  LIKED_POSTS,
  SET_SEARCH_TERM,
  RESET_SEARCH_TERM,
  EDIT_PROFILE,
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  GET_USER_PROFILE_DETAILS_BY_ID,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW,
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  UPDATE_POSTS_STATE,
  SET_BROWSE_TAB_INDEX,
  SET_HOME_TAB_INDEX,
  SET_PROFILE_TAB_INDEX,
  SET_SOCIAL_TAB_INDEX,
  LOADING_SUGGESTED,
  LOADED_SUGGESTED,
  FETCH_NOTIFICATIONS,
} from './types';

import { post as URL } from '../services/baseURL';
axios.defaults.withCredentials = true;

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`);
  if (res.data) {
    if (res.data.profile_picture.indexOf('/uploads/profile_pic-') >= 0) {
      res.data.profile_picture = `${URL}${res.data.profile_picture}`;
      dispatch({ type: FETCH_USER, payload: res.data });
    } else {
      dispatch({ type: FETCH_USER, payload: res.data });
    }
  } else {
    dispatch({ type: FETCH_USER, payload: res.data });
  }
};

export const getCourses = page => async dispatch => {
  const res = await axios.get(`${URL}/api/courses?page=${page}`);
  dispatch({ type: FETCH_COURSES, payload: res.data.results });
};

export const getArticles = () => async dispatch => {
  const res = await axios.get(`${URL}/api/articles`);
  dispatch({ type: FETCH_ARTICLES, payload: res.data });
};

export const authModalToggle = () => ({ type: AUTH_MODAL_TOGGLE });

export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP });

export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN });

export const saveLink = post => async dispatch => {
  const res = await axios.post(`${URL}/api/posts`, { post_url: post });
  dispatch({ type: SAVE_LINK, payload: res.data });
};

// get all user posts
export const getPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts`);
  dispatch({ type: FETCH_POSTS, payload: res.data });
};

// add new user post to posts state
export const updatePostsState = post => async dispatch => {
  dispatch({ type: UPDATE_POSTS_STATE, payload: post });
};

export const deletePost = id => async dispatch => {
  const res = await axios.delete(`${URL}/api/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: res.data });
};

export const getlikedPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts/likes`);
  dispatch({ type: LIKED_POSTS, payload: res.data });
};

export const editProfile = (id, profile) => async dispatch => {
  await axios.put(`${URL}/api/users/edit`, { id, ...profile });
  const res = await axios.get(`${URL}/auth/current_user`);
  dispatch({ type: EDIT_PROFILE, payload: res.data });
};

export const setSearchTerm = e => ({
  type: SET_SEARCH_TERM,
  payload: e.target.value,
});

export const resetSearchTerm = () => ({
  type: RESET_SEARCH_TERM,
  payload: '',
});

export const getFollowersAndFollowingCount = () => async dispatch => {
  const res = await axios.get(`${URL}/api/users/followStats`);
  dispatch({ type: GET_FOLLOWERS_AND_FOLLOWING_COUNT, payload: res.data });
};

export const getUserProfileDetails = id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/id/${id}`);
  dispatch({ type: GET_USER_PROFILE_DETAILS_BY_ID, payload: res.data[0] });
};

export const followAUser = payload => async dispatch => {
  const res = await axios.post(`${URL}/api/users/subscribe`, payload);
  dispatch({ type: FOLLOW_A_USER, payload: res.data });
};

export const unfollowAUser = payload => async dispatch => {
  const res = await axios.delete(`${URL}/api/users/unsubscribe`, {
    data: {
      user_id: payload.user_id,
      friend_id: Number(payload.friend_id),
    },
  });
  dispatch({ type: UNFOLLOW_A_USER, payload: res.data });
};

export const getFollowing = friend_id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/following/${friend_id}`);
  dispatch({ type: GET_FOLLOWING, payload: res.data.following });
};

export const recommendedFollow = id => async dispatch => {
  dispatch({ type: LOADING_SUGGESTED });
  const res = await axios.get(`${URL}/api/users/recommendedFollow?id=${id}`);
  dispatch({ type: LOADED_SUGGESTED });
  dispatch({ type: RECOMMENDED_FOLLOW, payload: res.data });
};

// get a users following list
export const getUserFollowing = id => async dispatch => {
  const following = await axios.get(`${URL}/api/users/following?id=${id}`);
  dispatch({ type: GET_USER_FOLLOWING, payload: following.data });
};

// get a users followers list
export const getUserFollowers = id => async dispatch => {
  const followers = await axios.get(`${URL}/api/users/followers?id=${id}`);
  dispatch({ type: GET_USER_FOLLOWERS, payload: followers.data });
};

// controls Browse tabIndex
export const setBrowseTabIndex = index => ({
  type: SET_BROWSE_TAB_INDEX,
  payload: index,
});

// controls Home tabIndex
export const setHomeTabIndex = index => ({
  type: SET_HOME_TAB_INDEX,
  payload: index,
});

// controls Profile tabIndex
export const setProfileTabIndex = index => ({
  type: SET_PROFILE_TAB_INDEX,
  payload: index,
});

// controls Profile tabIndex
export const setSocialTabIndex = index => ({
  type: SET_SOCIAL_TAB_INDEX,
  payload: index,
});

export const populateNotifications = (NotificationsArr) => dispatch => {
  dispatch({type: FETCH_NOTIFICATIONS, payload: NotificationsArr})
}