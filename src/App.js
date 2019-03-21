import React, { Component } from 'react';
import axios from 'axios';
import Newsfeed from './components/Newsfeed';

class App extends Component {
  componentDidMount() {
    const api = 'https://still-shynin-still-strugglin.herokuapp.com/';
    axios
      .get(api)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Learned</h1>
        </header>
        <Newsfeed />
      </div>
    );
  }
}

export default App;
