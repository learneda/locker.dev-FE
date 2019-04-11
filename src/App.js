import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LandingPage from './pages/Landing';
import Navbar from './components/navigation/Navbar';
import AuthUserProfile from './pages/AuthUserProfile';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import UserProfile from './pages/UserProfile';

import { composedIndexRedirect as index } from './components/authentication/indexRedirect';
import { composedHomeRedirect as home } from './components/authentication/homeRedirect';
import { fetchUser } from './actions';

import { customContainer } from './components/mixins';

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
          <Route component={index(UserProfile)} path="/profile/:id" />
          <Route component={index(AuthUserProfile)} path="/profile" />

          <Route component={index(Settings)} path="/settings" />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    );
  }
}

const Container = styled.div`
  ${customContainer()}
`;

export default withRouter(
  connect(
    null,
    { fetchUser }
  )(App)
);
