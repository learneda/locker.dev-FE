import React, { Component } from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import { customWrapper } from 'components/mixins'
import styled from 'styled-components'
import Notifications from 'components/notifications'
import { connect } from 'react-redux'
import { fetchUser } from 'actions'

class Notification extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.auth.id)
  }
  render() {
    const {
      auth,
      user,
      collections,
      followers,
      following,
      fetchFollowers,
      fetchFollowing,
    } = this.props
    return (
      <Container>
        <Sidebar
          auth={auth}
          user={user}
          collections={collections}
          followers={followers}
          following={following}
          fetchFollowers={fetchFollowers}
          fetchFollowing={fetchFollowing}
        />
        <Notifications />
      </Container>
    )
  }
}
const mapStateToProps = ({ auth, user, collections, social }) => ({
  auth,
  user,
  collections,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    fetchUser,
  }
)(Notification)

const Container = styled.div`
  ${customWrapper('80%', '0 auto')} display: flex;
`
