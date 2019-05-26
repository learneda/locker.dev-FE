const baseURL, authURL, apiURL, postURL

if (process.env.NODE_ENV === 'production') {
 baseURL = 'https://learned-a.herokuapp.com'
 authURL = 'https://learned-a.herokuapp.com/auth'
 apiURL = 'https://learned-a.herokuapp.com/api'
 postURL = 'https://learned-a.herokuapp.com/api/post/?url='
} else {
 baseURL = 'http://localhost:8000'
 authURL = 'http://localhost:8000/auth'
 apiURL = 'http://localhost:8000/api'
 postURL = 'http://localhost:8000/api/post/?url='
}

export { baseURL, authURL, apiURL, postURL }
