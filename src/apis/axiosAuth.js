import axios from 'axios'
import { authURL } from 'services'

//* Configures axios for our backend
export default axios.create({
  baseURL: authURL,
  withCredentials: true,
})
