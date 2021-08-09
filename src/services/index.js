const baseURL = process.env.REACT_APP_LEARN_LOCKER_API_URL
const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://learnlocker.app'
    : 'http://localhost:3000'

const authURL = `${baseURL}/auth`
const apiURL = `${baseURL}/api`
const postURL = `${baseURL}/api/post/?url=`
export { baseURL, authURL, apiURL, postURL, clientUrl }
