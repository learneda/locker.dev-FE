export const post =
  process.env.NODE_ENV === 'production'
    ? 'https://learned-a.herokuapp.com'
    : 'http://localhost:8000'
