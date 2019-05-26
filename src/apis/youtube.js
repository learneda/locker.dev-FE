import axios from 'axios'

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 12,
    type: 'video',
    key: 'AIzaSyAox9SoXZEVF2JjbJ9lRsCE_Fpw_6sXKO0',
  },
})
