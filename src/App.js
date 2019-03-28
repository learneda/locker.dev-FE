import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from './pages/Landing';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Homepage from './components/Homepage';
import Browse from './components/Browse';
import NoMatch from './components/NoMatch';

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
          <Route component={LandingPage} exact path="/" />
          <Route component={Homepage} path="/home" />
          <Route component={Browse} path="/browse" />
          <Route component={UserProfile} path="/profile" />
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
