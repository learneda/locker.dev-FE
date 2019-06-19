import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Notifications from './components/Notifications'
import { customWrapper } from 'components/mixins'
import * as notificationActions from './store/notificationActions'

const NotificationsPage = props => {
  const { notifications, getNotifications } = props
  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <Container>
      <Notifications notifications={notifications} {...props} />
    </Container>
  )
}
const mapStateToProps = ({ notifications }) => ({
  notifications,
})

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(NotificationsPage)

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`
