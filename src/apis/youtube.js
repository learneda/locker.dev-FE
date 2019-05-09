import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 12,
    key: 'AIzaSyC27x8udfUh-Y9H11YiE7fOuNEn-rP7-eQ',
  },
});
