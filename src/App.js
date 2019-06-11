import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from 'components/mixins'
import Navbar from 'components/navigation/Navbar'
import { customContainer } from 'components/mixins'
import { composedIndexRedirect as index } from 'components/hoc/indexRedirect'
import { composedHomeRedirect as authentication } from 'components/hoc/homeRedirect'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import { fetchAuth, fetchUser } from 'actions'
import { fetchNotifications } from 'pages/Notifications/notificationActions'
import {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from 'pages/Home/homeActions'
import socket from 'socket'
//? Should we implement route-based code-splitting?
//TODO: Need to make this DRY
const LandingPagePromise = import('pages/Landing')
const HomePromise = import('pages/Home')
const BrowsePromise = import('pages/Browse')
const SocialPromise = import('pages/Social')
const NotificationsPromise = import('pages/Notifications')
const ProfilePromise = import('pages/Profile')
const SinglePostPromise = import('pages/SinglePost')
const SettingsPromise = import('pages/Settings')
const NoMatchPromise = import('pages/NoMatch')
const LandingPage = lazy(() => LandingPagePromise)
const Home = lazy(() => HomePromise)
const Browse = lazy(() => BrowsePromise)
const Social = lazy(() => SocialPromise)
const Notifications = lazy(() => NotificationsPromise)
const Profile = lazy(() => ProfilePromise)
const SinglePost = lazy(() => SinglePostPromise)
const Settings = lazy(() => SettingsPromise)
const NoMatch = lazy(() => NoMatchPromise)

const App = ({
  auth,
  fetchAuth,
  fetchUser,
  fetchNotifications,
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
}) => {
  //* initial fetchAuth and fetchUser on browser refresh
  useEffect(() => {
    fetchAuth().then(res => {
      if (res.id) {
        fetchUser(res.id)
        //* on CDM socket will emit to all other sockets online that this user connected
        socket.emit('join', { user_id: res.id })
        //* join namespace contains all the current users who are online

        socket.on('join', data => {
          fetchNotifications(data)
        })
        //* socket is listening on comments event & will receive an obj
        socket.on('comments', msg => {
          //* msg obj contains properties of content, action, post_id, user_id, username, created_at, & updated_at

          switch (msg.action) {
            //* when action type === destroy
            case 'destroy':
              //* invoke action creator deleteComment & pass in msg obj
              deleteComment(msg)
              break
            //* when action type === create
            case 'create':
              //* invoke action creator createComment & pass in msg obj
              createComment(msg)
              break
            default:
              break
          }
        })
        //* socket is listening on like event & will receive an obj
        socket.on('like', data => {
          //* obj contains postOwnerId, post_id, user_id, username
          //* console.log('in like socket connection', data)
          switch (data.action) {
            case 'unlike':
              //* invoke action creator unlikeComment & pass in msg obj
              unlikeComment(data)
              break
            case 'like':
              //* invoke action creator likeComment & pass in msg obj
              likeComment(data)
              break
            default:
              break
          }
        })
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const homePaths = ['/', '/feed', '/saved', '/locker']
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
          // home HOC
          <Route exact path={homePaths} component={authentication(Home)} />
          <Route path='/landing' component={LandingPage} />
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

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(
  mapStateToProps,
  {
    fetchAuth,
    fetchUser,
    fetchNotifications,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
  }
)(App)

const Container = styled.div`
  ${customContainer()};
`
