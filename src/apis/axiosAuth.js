import axios from 'axios'

//* Configures axios for our backend
export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://learned-a.herokuapp.com/auth'
      : 'http://localhost:8000/auth',
  withCredentials: true,
})
