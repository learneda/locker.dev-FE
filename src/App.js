import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './pages/Landing';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Homepage from './components/Homepage';
import Browse from './components/Browse';
import NoMatch from './components/NoMatch';

import { Container } from './components/mixins';

export default function App() {
  return (
    <Container>
      <Navbar />
      <Switch>
        <Route component={LandingPage} exact path="/" />
        <Route component={Homepage} path="/home" />
        <Route component={Browse} path="/browse" />
        <Route component={UserProfile} path="/profile" />
        <Route component={NoMatch}/>
      </Switch>
    </Container>
  );
}
