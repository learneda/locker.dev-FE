import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Sidebar from 'components/sidebar/Sidebar'
import Notifications from './Notifications'
import { customWrapper } from 'components/mixins'
import { fetchUser } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as notificationActions from './notificationActions'

const NotificationsPage = props => {
  const {
    auth,
    user,
    collections,
    notifications,
    social,
    following,
    followers,
    fetchUser,
    fetchFollowing,
    fetchFollowers,
    readNotifications,
  } = props

  useEffect(() => {
    readNotifications()
    if (!user) {
      fetchUser(auth.id)
    }
    if (!social) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
    }
  }, [])

  return (
    <Container>
      <Sidebar
        user={user}
        collections={collections}
        following={following}
        followers={followers}
      />
      <Notifications notifications={notifications} />
    </Container>
  )
}
const mapStateToProps = ({
  auth,
  user,
  collections,
  notifications,
  social,
}) => ({
  auth,
  user,
  collections,
  notifications,
  following: social.following,
  followers: social.followers,
})

export default connect(
  mapStateToProps,
  { fetchUser, ...socialActions, ...notificationActions }
)(NotificationsPage)

const Container = styled.div`
  ${customWrapper('80%', '0 auto')} display: flex;
`
