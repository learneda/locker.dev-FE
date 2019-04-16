import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LandingPage from './pages/Landing';
import AuthUserProfile from './pages/profile/AuthUserProfile';
import Browse from './pages/Browse';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import UserProfile from './pages/profile/UserProfile';
import Navbar from './components/navigation/Navbar';
import { customContainer } from './components/mixins';

import { composedIndexRedirect as index } from './components/authentication/indexRedirect';
import { composedHomeRedirect as home } from './components/authentication/homeRedirect';
import { fetchUser } from './actions';

class App extends Component {
  componentDidMount = () => this.props.fetchUser();
  componentDidUpdate = prevProps => {
    if (this.props.location !== prevProps.location) {
      this.props.fetchUser();
    }
  };

  render() {
    const {
      modalState: { modalOpen, editModalOpen }
    } = this.props;
    if (modalOpen || editModalOpen) {
      document.getElementById('body').setAttribute('style', 'overflow: hidden');
    } else {
      document.getElementById('body').setAttribute('style', 'overflow: auto');
    }
    return (
      <Container>
        <Navbar />
        <Switch>
          <Route component={home(LandingPage)} exact path="/" />
          <Route component={index(Browse)} path="/browse" />
          <Route component={index(UserProfile)} path="/profile/:id" />
          <Route component={index(AuthUserProfile)} path="/home" />
          <Route component={index(Settings)} path="/settings" />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    );
  }
}

const Container = styled.div`
  ${customContainer()};
`;

const mapStateToProps = ({ modalState }) => ({
  modalState
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser }
  )(App)
);
