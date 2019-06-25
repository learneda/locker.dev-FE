import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Notifications from './components/Notifications'
import NotificationsPlaceHolder from './components/NotificationsPlaceHolder'
import * as notificationActions from './store/notificationActions'

const NotificationsPage = props => {
  const { notifications, getNotifications } = props
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const asyncGetNotifications = async () => {
      await getNotifications()
      setLoading(false)
    }
    asyncGetNotifications()
  }, [])
  return loading ? (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1
          style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '50px' }}
        >
          Notifications
        </h1>
        <NotificationsPlaceHolder />
        <br />
        <NotificationsPlaceHolder />
        <br />
        <NotificationsPlaceHolder />
      </div>
    </Container>
  ) : (
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

NotificationsPage.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  getNotifications: PropTypes.func.isRequired,
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin: 30px auto;
`
