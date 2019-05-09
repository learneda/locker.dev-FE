import axios from 'axios';
axios.defaults.withCredentials = false;
export default axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2/',
  headers: { 'X-ListenAPI-Key': '608e70293265412eba4de5b5f1a88d57' },
  params: {
    sort_by_date: 0,
    type: 'episode',
    offset: 0,
  },
});
