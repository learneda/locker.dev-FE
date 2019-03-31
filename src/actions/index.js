import axios from 'axios';
import {
  FETCH_USER,
  FETCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_DISPLAY,
  SAVE_LINK,
  FETCH_POSTS,
  DELETE_POST
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
