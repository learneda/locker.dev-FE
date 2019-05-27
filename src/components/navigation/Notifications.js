import React, { Component } from 'react'
import bellIcon from 'assets/svg/bell.svg'
import { connect } from 'react-redux'
import ModalPortal from '../utils/ModalPortal'
import { Link } from 'react-router-dom'
import * as notificationActions from 'actions/notificationActions'
import styled from 'styled-components'
class Notifications extends Component {
  constructor() {
    super()
    this.state = {
      toggle: false,
    }
  }
  render() {
    let count = this.props.notifications
    if (count.length === 0) {
      return (
        <Link to='/notifications'>
          <StyledNotifications
            onClick={() => {
              // this.setState({ toggle: !this.state.toggle })
              this.props.readNotifications()
            }}
          >
            <img src={bellIcon} alt='bell-icon' className='bell-icon' />
            {count}
            {this.state.toggle && (
              <ModalPortal>
                <h1
                  onClick={() => {
                    this.setState({ toggle: !this.state.toggle })
                    this.props.deleteNotifications()
                  }}
                >
                  clear
                </h1>
                <div>YOU have no notification</div>
              </ModalPortal>
            )}
          </StyledNotifications>
        </Link>
      )
    } else {
      count = count.length
      return (
        <Link to='/notifications'>
          <StyledNotifications
            onClick={() => {
              this.setState({ toggle: !this.state.toggle })
              this.props.readNotifications()
            }}
          >
            <span id='notifications'>Notifications</span>
            <img src={bellIcon} alt='bell-icon' className='bell-icon' />
            <p>{count}</p>
            {this.state.toggle && (
              <ModalPortal>
                <h1
                  onClick={() => {
                    this.setState({ toggle: !this.state.toggle })
                    this.props.deleteNotifications()
                  }}
                >
                  clear
                </h1>
                {this.props.notifications.map((obj, i) => {
                  return (
                    <Link to={`/status/${obj.post_id}`}>
                      <div>{`${obj.invoker} ${obj.type} on your post`}</div>
                    </Link>
                  )
                })}
              </ModalPortal>
            )}
          </StyledNotifications>
        </Link>
      )
    }
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(Notifications)

const StyledNotifications = styled.div`
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
`
