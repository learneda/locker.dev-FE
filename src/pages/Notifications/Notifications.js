import React from 'react'

const Notifications = props => {
  const { notifications } = props

  const displayNotifications = notifications.map(notification => {
    return (
      <div key={notification.id}>
        <h1>{notification.invoker}</h1>
        <p>{notification.type}</p>
      </div>
    )
  })

  return <div>Notifications</div>
}

export default Notifications
