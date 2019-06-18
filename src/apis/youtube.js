import axios from 'axios'

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 12,
    type: 'video',
    key: 'AIzaSyAoF6NXzpfSKGKw_lf0M-_eZ8359cDE0bE',
  },
})
