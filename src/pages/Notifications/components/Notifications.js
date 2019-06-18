import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Notifications = props => {
  const { notifications, readNotifications } = props
  useEffect(() => {
    return () => readNotifications()
  }, [])
  const displayNotifications = notifications.map(n => {
    return (
      <div style={{ border: '2px solid red' }}>
        <Link to={`/status/${n.post_id}`} key={n.id}>
          <h1>
            {n.invoker} {n.type} on your post
          </h1>
        </Link>
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
