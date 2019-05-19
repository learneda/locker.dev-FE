import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from './components/mixins'
import Navbar from './components/navigation/Navbar'
import { customContainer } from './components/mixins'
import { composedIndexRedirect as index } from './components/authentication/indexRedirect'
import { composedHomeRedirect as home } from './components/authentication/homeRedirect'
import useInterval from './components/hooks/useInterval'
import { fetchAuth } from './actions'
import { ReactComponent as Loading } from './assets/svg/circles.svg'
import Notifications from './pages/Notifications'
//? Should we implement route-based code-splitting?
//TODO: Need to make this DRY
const LandingPagePromise = import('./pages/Landing')
const HomePromise = import('./pages/Home')
const BrowsePromise = import('./pages/Browse')
const SocialPromise = import('./pages/Social')
const SettingsPromise = import('./pages/Settings')
const NoMatchPromise = import('./pages/NoMatch')
const ProfilePromise = import('./pages/Profile')
const SinglePostPromise = import('./pages/SinglePost')
const LandingPage = lazy(() => LandingPagePromise)
const Home = lazy(() => HomePromise)
const Browse = lazy(() => BrowsePromise)
const Social = lazy(() => SocialPromise)
const Settings = lazy(() => SettingsPromise)
const NoMatch = lazy(() => NoMatchPromise)
const Profile = lazy(() => ProfilePromise)
const SinglePost = lazy(() => SinglePostPromise)

const App = ({ fetchAuth, fetchUser, fetchPosts, modal, auth }) => {
  const { isAuthOpen, isEditOpen } = modal
  useEffect(() => {
    // initial fetch user when you refresh browser
    fetchAuth()
    // gets bookmarks only on first site load
  }, [])

  // useInterval(() => {
  //   // fetches user information every 5 minutes to reduce number of server requests
  //   fetchAuth()
  // }, 300000)

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden')
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto')
  }
  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Suspense
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
      >
        <Switch>
          <Route component={home(LandingPage)} path='/' exact />
          <Route component={index(Home)} path='/home' />
          <Route component={index(Browse)} path='/browse' />
          <Route component={index(Social)} path='/social' />
          <Route component={index(Notifications)} path='/notifications' />
          <Route component={index(Profile)} path='/profile/:id' />
          <Route component={index(SinglePost)} path='/status/:id' />
          <Route component={index(Settings)} path='/settings' />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

const mapStateToProps = ({ modal, auth }) => ({ modal, auth })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchAuth }
  )(App)
)

const Container = styled.div`
  ${customContainer()};
`
