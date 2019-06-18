import React from 'react'

const Notifications = props => {
  const { notifications } = props
  console.log('is there any here ??', notifications)
  const displayNotifications = notifications.map(notification => {
    return (
      <div key={notification.id}>
        <h1>{notification.invoker}</h1>
        <p>{notification.type}</p>
      </div>
    )
  })

  return (
    <div>
      <h1>Notifications</h1>
      {displayNotifications}
    </div>
  )
}

export default Notifications
