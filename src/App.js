import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LandingPage from './pages/Landing';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Settings from './pages/Settings';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Navbar from './components/navigation/Navbar';
import { customContainer } from './components/mixins';
import { composedIndexRedirect as index } from './components/authentication/indexRedirect';
import { composedHomeRedirect as home } from './components/authentication/homeRedirect';
import { fetchUser } from './actions';

const App = ({ fetchUser, location, modal }) => {
  const { isAuthOpen, isEditOpen } = modal;

  useEffect(() => {
    fetchUser();
  }, [location]);

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden');
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto');
  }

  return (
    <Container>
      <Navbar />
      <Switch>
        <Route component={home(LandingPage)} exact path='/' />
        <Route component={index(Home)} path='/home' />
        <Route component={index(Browse)} path='/browse' />
        <Route component={index(Profile)} path='/profile/:id' />
        <Route component={index(Settings)} path='/settings' />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = ({ modal }) => ({ modal });

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser }
  )(App)
);

const Container = styled.div`
  ${customContainer()};
`;
