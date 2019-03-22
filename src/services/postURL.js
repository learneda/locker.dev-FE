export const post =
  process.env.NODE_ENV === 'production'
    ? 'https://learned-a.herokuapp.com/api/post/?url='
    : 'http://localhost:8000/api/post/?url=';
