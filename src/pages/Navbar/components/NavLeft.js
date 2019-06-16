import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLeft = props => {
  return (
    <ul>
      <li>
        <NavLink to='/'>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/browse'>
          <span>Browse</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/notifications'>
          <span>Notifications</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default NavLeft
