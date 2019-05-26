import axios from 'axios'
import { apiURL } from 'services'
axios.defaults.withCredentials = true

//* Configures axios for our backend
export default axios.create({
  baseURL: apiURL,
})
