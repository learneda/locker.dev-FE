import React, { useState, useRef } from 'react'
import bellIcon from 'assets/svg/bell.svg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as notificationActions from 'pages/Notifications/notificationActions'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'

const Notifications = props => {
  const { notifications, readNotifications, deleteNotifications } = props
  const modal = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useOnClickOutside(modal, () => setIsModalOpen(false))
  let count = props.notifications
  if (count.length === 0) {
    return (
      <StyledNotifications
        onClick={() => {
          setIsModalOpen(prevIsModal => !prevIsModal)
          readNotifications()
        }}
      >
        <img src={bellIcon} alt='bell-icon' className='bell-icon' />
        {count}
        {isModalOpen && (
          <div className='modal-portal' ref={modal}>
            <button
              onClick={e => {
                e.stopPropagation()
                setIsModalOpen(prevIsModal => !prevIsModal)
                deleteNotifications()
              }}
            >
              clear
            </button>
            <div>You have no new notifications.</div>
          </div>
        )}
      </StyledNotifications>
    )
  } else {
    count = count.length
    return (
      <StyledNotifications
        onClick={() => {
          setIsModalOpen(prevIsModal => !prevIsModal)
          readNotifications()
        }}
      >
        <img src={bellIcon} alt='bell-icon' className='bell-icon' />
        <p>{count}</p>
        {isModalOpen && (
          <div className='modal-portal' ref={modal}>
            <button
              onClick={e => {
                e.stopPropagation()
                setIsModalOpen(prevIsModal => !prevIsModal)
                deleteNotifications()
              }}
            >
              clear
            </button>
            {notifications.map((obj, i) => {
              return (
                <Link to={`/status/${obj.post_id}`} key={i}>
                  <div>{`${obj.invoker} ${obj.type} on your post`}</div>
                </Link>
              )
            })}
          </div>
        )}
      </StyledNotifications>
    )
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(Notifications)

const StyledNotifications = styled.div`
  position: relative;
  display: flex;
  padding: 5px 10px;
  border-radius: 5px;
  /* background: #f4511e;
  color: #fff; */
  color: #333;
  #notifications {
    background: none;
    margin: 0;
    padding: 5px 2px;
    color: #333;
  }
  span {
    background: none;
    margin: 0;
    padding: 0;
  }
  p {
    /* align-self: flex-end; */
    color: #3f65f2;
  }
  .modal-portal {
    display: flex;
    flex-direction: column;
    min-height: 180px;
    height: 100%;
    min-width: 320px;
    border: 2px solid #3059f3;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    position: absolute;
    top: 40px;
    right: -140px;
    z-index: 10;
    button {
      border-radius: 5px;
      align-self: flex-end;
      margin: 10px;
      background: none;
      border: 2px solid #3059f3;
      width: 45px;
      height: 25px;
      cursor: pointer;
    }
    div {
      text-align: center;
      margin-top: 30px;
    }
  }
`
