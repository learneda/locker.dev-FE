import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as notificationActions from 'actions'

const Notifications = props => {
  const { notifications, readNotifications } = props

  useEffect(() => {
    readNotifications()
  }, [])

  const displayNotifications = notifications.map(notification => (
    <>
      <h1>{notification.invoker}</h1>
      <p>{notification.type}</p>
    </>
  ))
  return <div>{displayNotifications}</div>
}

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(Notifications)
