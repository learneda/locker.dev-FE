import React from 'react'

const Notifications = props => {
  const { notifications } = props

  const displayNotifications = notifications.map(notification => {
    // console.log(notification)
    // the same notification gets console logged 3 times in a roll
    // created WARNING => Each child in a list should have a unique "key" prop
    return (
      <div key={notification.id}>
        <h1>{notification.invoker}</h1>
        <p>{notification.type}</p>
      </div>
    )
  })
  return <div>{displayNotifications}</div>
}

export default Notifications
