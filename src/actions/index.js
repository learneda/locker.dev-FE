import axios from 'axios';
import { FETCH_USER, FETCH_COURSES, FETCH_ARTICLES, ADD_LINK } from './types';
import { post } from '../services/baseURL';

export const getCourses = () => async dispatch => {
  const res = await axios.get(`http://localhost:8000/api/courses`);
  console.log('RES', res);
  dispatch({ type: FETCH_COURSES, payload: res.data.results });
};

export const getArticles = () => async dispatch => {
  const res = await axios.get(`http://localhost:8000/api/articles`);
  dispatch({ type: FETCH_ARTICLES, payload: res.data });
};

export const addLinktoHome = post => async dispatch => {
  const res = await axios.post(`${post}/posts`, post);
  dispatch({ type: ADD_LINK, payload: res.data });
};
