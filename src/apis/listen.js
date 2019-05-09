import axios from 'axios';
axios.defaults.withCredentials = false;
export default axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2/',
  // headers: { 'X-ListenAPI-Key': process.env.REACT_APP_LISTEN_API_KEY },
  params: {
    sort_by_date: 0,
    type: 'podcast',
    offset: 0,
  },
});
