import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from 'components/mixins'
import Navbar from 'components/navigation/Navbar'
import { customContainer } from 'components/mixins'
import { composedIndexRedirect as index } from 'components/authentication/indexRedirect'
import { composedHomeRedirect as home } from 'components/authentication/homeRedirect'
import useInterval from 'components/hooks/useInterval'
import { fetchAuth, fetchUser } from 'actions'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import Notifications from 'pages/Notifications'
//? Should we implement route-based code-splitting?
//TODO: Need to make this DRY
const LandingPagePromise = import('pages/Landing')
const HomePromise = import('pages/Home')
const BrowsePromise = import('pages/Browse')
const SocialPromise = import('pages/Social')
const SettingsPromise = import('pages/Settings')
const NoMatchPromise = import('pages/NoMatch')
const ProfilePromise = import('pages/Profile')
const SinglePostPromise = import('pages/SinglePost')
const LandingPage = lazy(() => LandingPagePromise)
const Home = lazy(() => HomePromise)
const Browse = lazy(() => BrowsePromise)
const Social = lazy(() => SocialPromise)
const Settings = lazy(() => SettingsPromise)
const NoMatch = lazy(() => NoMatchPromise)
const Profile = lazy(() => ProfilePromise)
const SinglePost = lazy(() => SinglePostPromise)

const App = ({ fetchAuth, fetchUser, fetchCollections, modal, auth }) => {
  const { isAuthOpen, isEditOpen } = modal
  useEffect(() => {
    //* initial fetchAuth and fetchUser on browser refresh
    fetchAuth().then(res => fetchUser(res.id))
  }, [])

  useInterval(() => {
    //* fetches auth information every 5 minutes to reduce number of server requests
    fetchAuth()
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
      <Suspense
        fallback={
          <div
            style={{
              height: '200px',
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
          <Route path='/' exact component={home(LandingPage)} />
          <Route path='/home' component={index(Home)} />
          <Route path='/browse' component={index(Browse)} />
          <Route path='/social' component={index(Social)} />
          <Route path='/notifications' component={index(Notifications)} />
          <Route path='/profile/:id' component={index(Profile)} />
          <Route path='/status/:id' component={index(SinglePost)} />
          <Route path='/settings' component={index(Settings)} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

const mapStateToProps = ({ modal, auth }) => ({ modal, auth })

export default connect(
  mapStateToProps,
  { fetchAuth, fetchUser }
)(App)

const Container = styled.div`
  ${customContainer()};
`
