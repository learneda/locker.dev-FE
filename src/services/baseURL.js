export const post =
  process.env.NODE_ENV === 'production'
    ? 'https://still-shynin-still-strugglin.herokuapp.com'
    : 'http://localhost:8000';
