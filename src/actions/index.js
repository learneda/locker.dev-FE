import axios from 'axios';
import {
  FETCH_USER,
  FETCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_DISPLAY,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
  SAVE_LINK,
  FETCH_POSTS,
  DELETE_POST,
  LIKED_POSTS,
  SEARCH_TERM,
  EDIT_MODAL_DISPLAY,
  EDIT_PROFILE,
  EDIT_POST_SUBMIT,
  EDIT_POST_GET_DEFAULT_DATA,
  GET_FOLLOWERS_AND_FOLLOWING_COUNT,
  GET_USER_PROFILE_DETAILS_BY_ID,
  FOLLOW_A_USER,
  UNFOLLOW_A_USER,
  GET_FOLLOWING,
  RECOMMENDED_FOLLOW
} from './types';
import { post as URL } from '../services/baseURL';
axios.defaults.withCredentials = true;

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`);
  if (res.data.profile_picture.indexOf('/uploads/profile_pic-') >= 0) {
    res.data.profile_picture = `${URL}${res.data.profile_picture}`
    dispatch({ type: FETCH_USER, payload: res.data });
  } else {
    dispatch({ type: FETCH_USER, payload: res.data });
  }
};

export const getCourses = () => async dispatch => {
  const res = await axios.get(`${URL}/api/courses`);
  dispatch({ type: FETCH_COURSES, payload: res.data.results });
};

export const getArticles = () => async dispatch => {
  const res = await axios.get(`${URL}/api/articles`);
  dispatch({ type: FETCH_ARTICLES, payload: res.data });
};

export const modalState = () => async dispatch => {
  dispatch({ type: AUTH_MODAL_DISPLAY });
};

export const modalSignUp = () => async dispatch => {
  dispatch({ type: AUTH_MODAL_SIGNUP });
};

export const modalLogin = () => async dispatch => {
  dispatch({ type: AUTH_MODAL_LOGIN });
};

export const saveLink = post => async dispatch => {
  const res = await axios.post(`${URL}/api/posts`, { post_url: post });
  dispatch({ type: SAVE_LINK, payload: res.data });
};

export const getPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts`);
  dispatch({ type: FETCH_POSTS, payload: res.data });
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

/* ===== EDIT POST ACTIONS ===== */
export const editModalDisplay = () => async dispatch => {
  dispatch({ type: EDIT_MODAL_DISPLAY });
};

export const editPostGetDefaultData = id => async dispatch => {
  const res = await axios.get(`${URL}/api/posts/${id}`);
  dispatch({ type: EDIT_POST_GET_DEFAULT_DATA, payload: res.data });
};
export const editPostSubmit = (editedPost, id) => async dispatch => {
  const res = await axios.put(`${URL}/api/posts/${id}`, editedPost);
  dispatch({ type: EDIT_POST_SUBMIT, payload: res.data });
};

export const getSearchValue = e => dispatch => {
  dispatch({ type: SEARCH_TERM, payload: e.target.value });
};

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
      friend_id: payload.friend_id
    }
  });
  dispatch({ type: UNFOLLOW_A_USER, payload: res.data });
};

export const getFollowing = friend_id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/following/${friend_id}`);
  dispatch({ type: GET_FOLLOWING, payload: res.data.following });
};

export const recommendedFollow = id => async dispatch => {
  const res = await axios.get(`${URL}/api/users/recommendedFollow?id=${id}`);
  console.log('RECOMMENDED FOLLOW RES', res);
  dispatch({ type: RECOMMENDED_FOLLOW, payload: res.data });
};
