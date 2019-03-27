export const authURL =
  process.env.NODE_ENV === 'production'
    ? 'https://learned-a.herokuapp.com/auth/'
    : 'http://localhost:8000/auth/';
