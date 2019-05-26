import axios from 'axios'
import { authURL } from 'services'
axios.defaults.withCredentials = true

//* Configures axios for our backend
export default axios.create({
  baseURL: authURL,
})
