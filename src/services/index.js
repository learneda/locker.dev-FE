const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://learned-a.herokuapp.com'
    : 'http://localhost:8000'
const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://learnlocker.dev'
    : 'http://localhost:3000'

const authURL = `${baseURL}/auth`
const apiURL = `${baseURL}/api`
const postURL = `${baseURL}/api/post/?url=`
export { baseURL, authURL, apiURL, postURL, clientUrl }
