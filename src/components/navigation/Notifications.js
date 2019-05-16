import React, { Component } from 'react'
import bellIcon from '../../assets/svg/bell.svg'
import { connect } from 'react-redux'
import ModalPortal from '../utils/ModalPortal'
import { Link } from 'react-router-dom'
import { readNotifications, deleteNotifications } from '../../actions'
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
        <div
          onClick={() => {
            this.setState({ toggle: !this.state.toggle })
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
        </div>
      )
    } else {
      count = count.length
      return (
        <div
          onClick={() => {
            this.setState({ toggle: !this.state.toggle })
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
              {this.props.notifications.map((obj, i) => {
                return (
                  <Link to={`/status/${obj.post_id}`}>
                    <div>{`${obj.invoker} ${obj.type} on your post`}</div>
                  </Link>
                )
              })}
            </ModalPortal>
          )}
        </div>
      )
    }
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(
  mapStateToProps,
  { readNotifications, deleteNotifications }
)(Notifications)
