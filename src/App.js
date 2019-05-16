import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from './components/mixins'
import LandingPage from './pages/Landing'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Social from './pages/Social'
import Settings from './pages/Settings'
import NoMatch from './pages/NoMatch'
import Profile from './pages/Profile'
import SinglePost from './pages/SinglePost/SinglePost'
import Navbar from './components/navigation/Navbar'
import { customContainer } from './components/mixins'
import { composedIndexRedirect as index } from './components/authentication/indexRedirect'
import { composedHomeRedirect as home } from './components/authentication/homeRedirect'
import useInterval from './components/hooks/useInterval'
import { fetchUser, getPosts } from './actions'
// import { ReactComponent as Loading } from './assets/svg/circles.svg';
//? Should we implement route-based code-splitting?
// const LandingPage = lazy(() => import('./pages/Landing'));
// const Home = lazy(() => import('./pages/Home'));
// const Browse = lazy(() => import('./pages/Browse'));
// const Social = lazy(() => import('./pages/Social'));
// const Settings = lazy(() => import('./pages/Settings'));
// const NoMatch = lazy(() => import('./pages/NoMatch'));
// const Profile = lazy(() => import('./pages/Profile'));
// const SinglePost = lazy(() => import('./pages/SinglePost/SinglePost'));

const App = ({ fetchUser, modal, getPosts }) => {
  const { isAuthOpen, isEditOpen } = modal

  useEffect(() => {
    // initial fetch user when you refresh browser
    fetchUser()

    // gets bookmarks only on first site load
  }, [fetchUser])

  useInterval(() => {
    // fetches user information every 5 minutes to reduce number of server requests
    fetchUser()
  }, 300000)

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden')
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto')
  }

  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      {/* <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading />
          </div>
        }
      > */}
      <Switch>
        <Route component={home(LandingPage)} path='/' exact />
        <Route component={index(Home)} path='/home' />
        <Route component={index(Browse)} path='/browse' />
        <Route component={index(Social)} path='/social' />
        <Route component={index(Profile)} path='/profile/:id' />
        <Route component={index(SinglePost)} path='/status/:id' />
        <Route component={index(Settings)} path='/settings' />
        <Route component={NoMatch} />
      </Switch>
      {/* </Suspense> */}
    </Container>
  )
}

const mapStateToProps = ({ modal }) => ({ modal })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUser }
  )(App)
)

const Container = styled.div`
  ${customContainer()};
`
