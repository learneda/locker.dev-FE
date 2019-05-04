import React, { Component } from 'react'
import bellIcon from '../../assets/svg/bell.svg'

export default class Notifications extends Component {
  render() {
    return (
      <div>
          <img
              src={bellIcon}
              alt='bell-icon'
              className='bell-icon'
            />
      </div>
    )
  }
}
