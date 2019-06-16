import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Notifications from './Notifications'
import { customWrapper } from 'components/mixins'
import * as notificationActions from './notificationActions'

const NotificationsPage = props => {
  const { notifications, readNotifications } = props

  useEffect(() => {
    readNotifications()
  }, [])

  return (
    <Container>
      <Notifications notifications={notifications} />
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
  ${customWrapper('80%', '0 auto')} display: flex;
`
