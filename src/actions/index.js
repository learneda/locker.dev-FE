import axios from 'axios';
import { FETCH_USER, FETCH_COURSES } from './types';

export const getCourses = () => async dispatch => {
  const res = await axios.get(`http://localhost:8000/api/courses`);
  console.log('RES', res);
  dispatch({ type: FETCH_COURSES, payload: res.data.results });
};
