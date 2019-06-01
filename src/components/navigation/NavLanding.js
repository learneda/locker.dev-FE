import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Navbar'

const NavLanding = ({ authModalToggle, modalSignUp, modalLogin }) => {
  return (
    <Nav style={{ marginTop: '20px' }}>
      <h1>
        <Link to='/'>LearnLocker</Link>
      </h1>
      <ul>
        <li>
          <span
            onClick={() => {
              authModalToggle()
              modalLogin()
            }}
          >
            Log In
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              authModalToggle()
              modalSignUp()
            }}
          >
            Sign Up
          </span>
        </li>
      </ul>
    </Nav>
  )
}
export default NavLanding
