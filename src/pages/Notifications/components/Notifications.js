import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Notifications = props => {
  const { notifications, readNotifications } = props
  useEffect(() => {
    return () => readNotifications()
  }, [])
  const displayNotifications = notifications
    .map(n => {
      if (n.read === false) {
        return (
          <div
            key={n.id}
            style={{
              border: '2px solid dodgerblue',
              marginBottom: '50px',
              padding: '30px',
            }}
          >
            <Link to={`/status/${n.post_id}`}>
              <h1 style={{ fontSize: '30px' }}>
                {n.invoker} {n.type} on your post
              </h1>
            </Link>
          </div>
        )
      }
      return (
        <div
          key={n.id}
          style={{
            border: '2px solid black',
            marginBottom: '50px',
            padding: '30px',
          }}
        >
          <Link to={`/status/${n.post_id}`}>
            <h1 style={{ fontSize: '30px' }}>
              {n.invoker} {n.type} on your post
            </h1>
          </Link>
        </div>
      )
    })
    .reverse()

  return (
    <div style={{ margin: '0 auto' }}>
      <h1
        style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '50px' }}
      >
        Notifications
      </h1>
      {displayNotifications}
    </div>
  )
}

export default Notifications
