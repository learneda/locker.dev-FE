import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import HelpScreen from 'components/Screens/HelpScreen'
import OnlineFriendsSVG from 'assets/svg/online_friends.svg'

const Notifications = props => {
  const { notifications, readNotifications } = props
  useEffect(() => {
    return () => readNotifications()
  }, [])
  let displayNotifications
  if (notifications.length) {
    displayNotifications = notifications
      .map(n => {
        if (n.read === false) {
          return (
            <div
              key={n.id}
              style={{
                border: '2px solid dodgerblue',
                marginBottom: '50px',
                padding: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: '5px',
                backgroundColor: 'white',
                boxShadow:
                  '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              <img
                src={n.profile_picture}
                style={{
                  width: '30px',
                  height: '30px',
                  marginLeft: '5px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
                alt='sender-thumbnail'
              />
              <Link to={`/status/${n.post_id}`}>
                <h1 style={{ fontSize: '30px' }}>
                  {n.invoker} {n.type} on your post
                </h1>
              </Link>
              <img
                style={{
                  width: '30px',
                  height: '30px',
                  marginLeft: '5px',
                  borderRadius: '5px',
                }}
                src={n.thumbnail_url}
                alt='post-thumbnail'
              />
            </div>
          )
        } else {
          return (
            <div
              key={n.id}
              style={{
                border: '2px solid black',
                marginBottom: '50px',
                padding: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: '5px',
                backgroundColor: 'white',
                boxShadow:
                  '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              <img
                src={n.profile_picture}
                style={{
                  width: '30px',
                  height: '30px',
                  marginLeft: '5px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
                alt='sender-thumbnail'
              />
              <Link to={`/status/${n.post_id}`}>
                <h1 style={{ fontSize: '30px' }}>
                  {n.invoker} {n.type} on your post
                </h1>
              </Link>
              <img
                src={n.thumbnail_url}
                style={{
                  width: '30px',
                  height: '30px',
                  marginLeft: '5px',
                  borderRadius: '5px',
                }}
                alt='post-thumbnail'
              />
            </div>
          )
        }
      })
      .reverse()
  } else {
    displayNotifications = (
      <div
        style={{
          border: '2px solid black',
          marginBottom: '50px',
          padding: '30px',
          display: 'flex',
          borderRadius: '5px',
          backgroundColor: 'white',
          boxShadow:
            '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
      >
        <HelpScreen
          headerText='Welcome to locker.dev! Start by introducing yourself in the welcome hashtag.'
          imgSource={OnlineFriendsSVG}
        />
      </div>
    )
  }

  return (
    <div style={{ margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '35px',
          fontWeight: 'bold',
          marginBottom: '50px',
          textAlign: 'center',
        }}
      >
        Notifications
      </h1>
      {displayNotifications}
    </div>
  )
}

export default Notifications

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  readNotifications: PropTypes.func.isRequired,
}
