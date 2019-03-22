import React, { Component } from 'react';
import axios from 'axios';
import { Grommet } from 'grommet';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Newsfeed from './components/Newsfeed';

import { Container } from './components/mixins';

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
      <Container>
        <Navbar />
        <Switch>
          <Route component={LandingPage} exact path="/" />
          <Route component={Newsfeed} path="/feed" />
          <Route component={UserProfile} path="/profile" />
        </Switch>
      </Container>
    );
  }
}

export default App;
