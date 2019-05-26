import React from 'react'

const Notifications = props => {
  const { notifications } = props

  const displayNotifications = notifications.map(notification => (
    <>
      <h1>{notification.invoker}</h1>
      <p>{notification.type}</p>
    </>
  ))
  return <div>{displayNotifications}</div>
}

export default Notifications
