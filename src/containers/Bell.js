import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import BellSVG from 'assets/react-svg/BellSVG'
import { Link } from 'react-router-dom'
import * as notificationActions from 'pages/Notifications/store/notificationActions'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'

const Bell = props => {
  const { user, posts, notifications, readNotifications, bellColor } = props
  const ref = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  useOnClickOutside(ref, e => {
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes('bell-modal')
    ) {
      return
    }
    setIsModalOpen(false)
  })

  const count = notifications.filter(notification =>
    Boolean(!notification.read)
  ).length

  const selectThumbnail = postId => {
    return posts
      .filter(post => post.id === postId)
      .map(post => post.thumbnail_url)
  }
  return (
    <StyledNotifications>
      <BellSVG bellColor={bellColor} />
      <p className='count'>{count ? count : null}</p>
      {isModalOpen && (
        <div className='modal-portal bell-modal' ref={ref}>
          {!count ? (
            <div className='notification-empty bell-modal'>
              You have no new notifications.
            </div>
          ) : (
            notifications.map((obj, i) => {
              return (
                <Link
                  className='notification bell-modal'
                  key={i}
                  to={`/status/${obj.post_id}`}
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className='notification-left bell-modal'>
                    <img
                      style={{ width: '100%' }}
                      className='notification-image bell-modal'
                      src={user.profile_picture}
                      alt='avatar'
                    />
                    <span className='text bell-modal'>{`${obj.invoker} ${
                      obj.type
                    } on your post`}</span>
                  </div>
                  <img
                    className='notification-post-thumbnail bell-modal'
                    src={selectThumbnail(obj.post_id)}
                    alt='post-thumbnail'
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
)(Bell)

const StyledNotifications = styled.div`
  display: flex;
  position: relative;
  .bell {
    position: relative;
    top: 2.5px;
    width: 20px;
    height: 20px;
    .bell-icon {
      width: 100%;
    }
  }
  .count {
    color: #3f65f2;
  }
  .modal-portal {
    display: flex;
    position: fixed;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.0975);
    flex-direction: column;
    max-height: 250px;
    width: 450px;
    overflow: auto;
    border: 1px solid dodgerblue;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 5px;
    top: 52px;
    left: calc(50% - 225px);
    z-index: 10;
    .notification-empty {
      text-align: center;
      margin: 50px 0;
    }

    .notification {
      display: flex;
      min-height: 60px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 30px;
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
