import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readNotifications, deleteNotifications } from '../../actions'

class Notifications extends Component {
  componentDidMount() {
    this.props.readNotifications()
  }
  render() {
    let notifications = this.props.notifications.map(notification => (
      <>
        <h1>{notification.invoker}</h1>
        <p>{notification.type}</p>
      </>
    ))
    return <div>{notifications}</div>
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(
  mapStateToProps,
  { readNotifications, deleteNotifications }
)(Notifications)
