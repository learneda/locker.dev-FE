import React from 'react'
import { connect } from 'react-redux'
import Sidebar from 'components/sidebar/Sidebar'
import Notifications from 'components/notifications'
import { customWrapper } from 'components/mixins'
import styled from 'styled-components'

const NotificationsPage = props => {
  const {
    user,
    collections,
    notifications,
    social,
    following,
    followers,
  } = props
  return (
    <Container>
      <Sidebar
        user={user}
        collections={collections}
        following={following}
        followers={followers}
      />
      <Notifications />
    </Container>
  )
}
const mapStateToProps = ({ user, collections, notifications, social }) => ({
  user,
  collections,
  notifications,
  following: social.following,
  followers: social.followers,
})

export default connect(
  mapStateToProps,
  null
)(NotificationsPage)

const Container = styled.div`
  ${customWrapper('80%', '0 auto')} display: flex;
`
