import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLeft = props => {
  return (
    <ul>
      <li>
        <NavLink to='/home'>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/browse'>
          <span>Browse</span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/social'>
          <span>Social</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default NavLeft
