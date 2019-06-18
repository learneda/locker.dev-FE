import React, { useEffect } from 'react'

const Notifications = props => {
  const { notifications, readNotifications } = props
  useEffect(() => {
    readNotifications()
  }, [])
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
