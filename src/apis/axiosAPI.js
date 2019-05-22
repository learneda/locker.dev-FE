import axios from 'axios'
axios.defaults.withCredentials = true
//* Configures axios for our backend
export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://learned-a.herokuapp.com/api'
      : 'http://localhost:8000/api',
})
