import React, { useState, useRef } from 'react'
import bellIcon from 'assets/svg/bell.svg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as notificationActions from 'pages/Notifications/notificationActions'
import styled from 'styled-components'

const Notifications = props => {
  const {
    user,
    posts,
    notifications,
    readNotifications,
    deleteNotifications,
  } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  let count = props.notifications
  count = count.length

  const selectThumbnail = postId => {
    return posts
      .filter(post => post.id === postId)
      .map(post => post.thumbnail_url)
  }
  return (
    <StyledNotifications>
      <img
        onClick={() => {
          setIsModalOpen(prevState => !prevState)
          readNotifications()
        }}
        src={bellIcon}
        alt='bell-icon'
        className='bell-icon'
      />
      <p className='count'>{count ? count : null}</p>
      {isModalOpen && (
        <div className='modal-portal'>
          {!count ? (
            <div className='notification-empty'>
              You have no new notifications.
            </div>
          ) : (
            notifications.map((obj, i) => {
              return (
                <Link
                  className='notification'
                  key={i}
                  to={`/status/${obj.post_id}`}
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className='notification-left'>
                    <img
                      className='notification-image'
                      src={user.profilePicture}
                    />
                    <span className='text'>{`${obj.invoker} ${
                      obj.type
                    } on your post`}</span>
                  </div>
                  <img
                    className='notification-post-thumbnail'
                    src={selectThumbnail(obj.post_id)}
                  />
                </Link>
              )
            })
          )}
        </div>
      )}
    </StyledNotifications>
  )
}

const mapStateToProps = ({ user, home, notifications }) => ({
  user,
  notifications,
  posts: home.posts,
})

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(Notifications)

const StyledNotifications = styled.div`
  display: flex;
  position: relative;
  padding: 5px 10px;
  color: #333;
  .count {
    color: #3f65f2;
  }
  .modal-portal {
    display: flex;
    position: absolute;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.0975);
    flex-direction: column;
    height: 250px;
    width: 450px;
    overflow: auto;
    border: 1px solid #e6e6e6;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 5px;
    top: 40px;
    right: -140px;
    z-index: 10;
    @media (max-width: 760px) {
      position: fixed;
      height: 150px;
      top: 50px;
      right: 0;
      width: 100%;
    }
    .modal-close {
      position: absolute;
      display: flex;
      align-item: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      border-radius: 5px;
      top: 10px;
      right: 5px;
      z-index: 20;
      background: none;
      border: 2px solid #3059f3;
      width: 45px;
      height: 25px;
      cursor: pointer;
    }
    .notification-empty {
      text-align: center;
      margin-top: 50px;
    }

    .notification {
      display: flex;
      min-height: 60px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 20px;
      .text {
        background: none;
        color: #333;
        font-weight: normal;
      }
    }
    .notification-left {
      display: flex;
      align-items: center;
    }
    .notification-image {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .notification-post-thumbnail {
      height: 30px;
      width: 30px;
    }
  }
`
