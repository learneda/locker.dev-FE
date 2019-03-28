import axios from 'axios';
import {
  FETCH_USER,
  FETCH_COURSES,
  FETCH_ARTICLES,
  AUTH_MODAL_DISPLAY,
  SAVE_LINK
} from './types';
import { post as URL } from '../services/baseURL';

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${URL}/auth/current_user`, {
    withCredentials: true
  });
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getCourses = () => async dispatch => {
  const res = await axios.get(`${URL}/api/courses`);
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const getArticles = () => async dispatch => {
  const res = await axios.get(`${URL}/api/articles`);
  dispatch({ type: FETCH_ARTICLES, payload: res.data });
};

export const modalState = () => async dispatch => {
  dispatch({ type: AUTH_MODAL_DISPLAY });
};

export const saveLink = post => async dispatch => {
  const res = await axios.post(`${URL}/api/posts`, post);
  dispatch({ type: SAVE_LINK, payload: res.data });
};
