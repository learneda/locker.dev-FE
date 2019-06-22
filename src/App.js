import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from 'components/mixins'
import { composedIndexRedirect as index } from 'hoc/indexRedirect'
import socket from 'socket'
import * as appActions from 'appActions'
import { receivingNotifications } from './pages/Notifications/store/notificationActions'
import Navbar from 'pages/Navbar'
const LandingPage = lazy(() => import('pages/Landing'))
const Home = lazy(() => import('pages/Home'))
const Browse = lazy(() => import('pages/Browse'))
const Locker = lazy(() => import('pages/Locker'))
const HashTag = lazy(() => import('pages/HashTag'))
const Social = lazy(() => import('pages/Social'))
const Notifications = lazy(() => import('pages/Notifications'))
const Profile = lazy(() => import('pages/Profile'))
const SinglePost = lazy(() => import('pages/SinglePost'))
const Settings = lazy(() => import('pages/Settings'))
const Success = lazy(() => import('pages/Success'))
const NoMatch = lazy(() => import('pages/NoMatch'))

const App = props => {
  const {
    auth,
    fetchAuth,
    receivingNotifications,
    createComment,
    deleteComment,
    likePost,
    unlikePost,
    ponyUp,
    ponyDown,
  } = props
  // initial fetchAuth and fetchUser on browser refresh
  useEffect(() => {
    fetchAuth().then(user => {
      if (user.id) {
        // on CDM socket will emit to all other sockets online that this user connected
        socket.emit('join', { user_id: user.id })
        // join namespace contains all the current users who are online

        socket.on('join', data => {
          receivingNotifications(data)
        })
        // socket is listening on comments event & will receive an obj
        socket.on('comments', msg => {
          // msg obj contains properties of content, action, post_id, user_id, username, created_at, & updated_at

          switch (msg.action) {
            // when action type === destroy
            case 'destroy':
              // invoke action creator deleteComment & pass in msg obj
              deleteComment(msg)
              break
            // when action type === create
            case 'create':
              // invoke action creator createComment & pass in msg obj
              createComment(msg)
              break
            default:
              break
          }
        })
        // socket is listening on like event & will receive an obj
        socket.on('like', data => {
          // obj contains postOwnerId, post_id, user_id, username
          // console.log('in like socket connection', data)
          switch (data.action) {
            case 'unlike':
              // invoke action creator unlikePost & pass in msg obj
              unlikePost(data)
              break
            case 'like':
              // invoke action creator likePost & pass in msg obj
              likePost(data)
              break
            default:
              break
          }
        })
        socket.on('pony', data => {
          // obj contains postOwnerId, post_id, user_id, username
          // console.log('in like socket connection', data)
          switch (data.action) {
            case 'pony_down':
              // invoke action creator ponyDown & pass in msg obj
              ponyDown(data)
              break
            case 'pony_up':
              // invoke action creator ponyUp & pass in msg obj
              ponyUp(data)
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

  return (
    <Container>
      <GlobalStyle />
      {auth && window.location.pathname !== '/success' && <Navbar />}
      <Suspense fallback={null}>
        <Switch>
          <Route exact path='/' component={index(Home)} />
          <Route path='/browse' component={index(Browse)} />
          <Route path='/locker' component={index(Locker)} />
          <Route path='/tag/:tag' component={index(HashTag)} />
          <Route path='/social' component={index(Social)} />
          <Route path='/notifications' component={index(Notifications)} />
          <Route path='/profile/:id' component={index(Profile)} />
          <Route path='/status/:id' component={index(SinglePost)} />
          <Route path='/settings' component={index(Settings)} />
          <Route path='/success' component={index(Success)} />
          <Route path='/landing' component={LandingPage} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { ...appActions, receivingNotifications }
)(App)

const Container = styled.div`
  width: 100%;
  color: #141619;
  background-color: #e6ecf0;
  min-height: 100vh;
  height: 100%;
`
