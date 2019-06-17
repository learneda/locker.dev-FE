import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from 'components/mixins'
import Navbar from 'components/navigation/Navbar'
import { composedIndexRedirect as index } from 'components/hoc/indexRedirect'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import * as appActions from 'appActions'
import socket from 'socket'
import HashTag from './pages/HashTag/'

const LandingPage = lazy(() => import('pages/Landing'))
const Home = lazy(() => import('pages/Home'))
const Browse = lazy(() => import('pages/Browse'))
const Social = lazy(() => import('pages/Social'))
const Notifications = lazy(() => import('pages/Notifications'))
const Profile = lazy(() => import('pages/Profile'))
const SinglePost = lazy(() => import('pages/SinglePost'))
const Settings = lazy(() => import('pages/Settings'))
const NoMatch = lazy(() => import('pages/NoMatch'))

const App = props => {
  const {
    fetchAuth,
    fetchUser,
    fetchNotifications,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
    ponyUp,
    ponyDown,
  } = props
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
          console.log('does the action exist', msg)

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
        socket.on('pony', data => {
          //* obj contains postOwnerId, post_id, user_id, username
          //* console.log('in like socket connection', data)
          switch (data.action) {
            case 'pony_down':
              //* invoke action creator unlikeComment & pass in msg obj
              ponyDown(data)
              break
            case 'pony_up':
              //* invoke action creator likeComment & pass in msg obj
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
          <Route exact path={homePaths} component={index(Home)} />
          <Route path='/landing' component={LandingPage} />
          <Route path='/browse' component={index(Browse)} />
          <Route path='/social' component={index(Social)} />
          <Route path='/notifications' component={index(Notifications)} />
          <Route path='/profile/:id' component={index(Profile)} />
          <Route path='/status/:id' component={index(SinglePost)} />
          <Route path='/settings' component={index(Settings)} />
          <Route path='/tag/:tag' component={HashTag} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

export default connect(
  null,
  { ...appActions }
)(App)

const Container = styled.div`
  width: 100%;
  color: #141619;
  background-color: #fff;
`
