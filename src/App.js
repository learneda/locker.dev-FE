import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Newsfeed from './components/Newsfeed';
import Browse from './components/Browse';

import { Container } from './components/mixins';

export default function App() {
  return (
    <Container>
      <Navbar />
      <Switch>
        <Route component={LandingPage} exact path="/" />
        <Route component={Newsfeed} path="/feed" />
        <Route component={Browse} path="/browse" />
        <Route component={UserProfile} path="/profile" />
      </Switch>
    </Container>
  );
}
