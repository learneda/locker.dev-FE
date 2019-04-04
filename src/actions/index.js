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
  EDIT_MODAL_DISPLAY,
  EDIT_PROFILE,
  SEARCH_TERM
} from './types';
import { post as URL } from '../services/baseURL';
axios.defaults.withCredentials = true;

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`);
  dispatch({ type: FETCH_USER, payload: res.data });
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
  console.log('in here');
  const res = await axios.get(`${URL}/api/posts`);
  console.log('resss data', res.data);
  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const deletePost = id => async dispatch => {
  console.log('delete post action');
  const res = await axios.delete(`${URL}/api/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: res.data });
};

export const getlikedPosts = () => async dispatch => {
  const res = await axios.get(`${URL}/api/posts/likes`);
  dispatch({ type: LIKED_POSTS, payload: res.data });
};

export const editModalDisplay = id => async dispatch => {
  const res = await axios.get(`${URL}/api/posts/${id}`);
  dispatch({ type: EDIT_MODAL_DISPLAY, payload: res.data });
};

export const editProfile = (id, profile) => async dispatch => {
  await axios.put(`${URL}/auth/current_user/${id}`, profile);
  const res = await axios.get(`${URL}/auth/current_user`);
  console.log('RES', res);
  dispatch({ type: EDIT_PROFILE, payload: res.data });
};


export const getSearchValue = (e) => dispatch => {
  dispatch({ type: SEARCH_TERM, payload: e.target.value});
}