import axios from 'axios'

//* Configures axios for our backend
export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.learnlocker.dev'
      : 'http://localhost:8000',
  withCredentials: true,
})
