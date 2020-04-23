const baseURL = process.env.BASE_URL

const clientUrl = process.env.CLIENT_URL

const authURL = `${baseURL}/auth`
const apiURL = `${baseURL}/api`
const postURL = `${baseURL}/api/post/?url=`
export { baseURL, authURL, apiURL, postURL, clientUrl }
