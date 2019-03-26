import axios from 'axios';
import { FETCH_USER, FETCH_COURSES, FETCH_ARTICLES } from './types';

export const getCourses = () => async dispatch => {
  const res = await axios.get(`http://localhost:8000/api/courses`);
  console.log('RES', res);
  dispatch({ type: FETCH_COURSES, payload: res.data.results });
};

export const getArticles = () => async dispatch => {
  const res = await axios.get(`http://localhost:8000/api/articles`);
  dispatch({ type: FETCH_ARTICLES, payload: res.data });
};
