import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from './pages/Landing';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './pages/Home';
import Browse from './components/Browse';
import NoMatch from './components/NoMatch';

import { composedIndexRedirect as index } from './components/authentication/indexRedirect';
import { composedHomeRedirect as home } from './components/authentication/homeRedirect';
import { Container } from './components/mixins';
import { fetchUser } from './actions';

class App extends Component {
  componentDidMount = () => this.props.fetchUser();
  componentDidUpdate = prevProps => {
    if (this.props.location !== prevProps.location) {
      this.props.fetchUser();
    }
  };

  render() {
    return (
      <Container>
        <Navbar />
        <Switch>
          <Route component={home(LandingPage)} exact path="/" />
          <Route component={index(Home)} path="/home" />
          <Route component={index(Browse)} path="/browse" />
          <Route component={index(UserProfile)} path="/profile" />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchUser }
  )(App)
);
