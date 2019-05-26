import axios from 'axios'
import { apiURL } from 'services'

//* Configures axios for our backend
export default axios.create({
  baseURL: apiURL,
  withCredentials: true,
})
