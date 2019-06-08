import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Navbar'

const NavLanding = props => {
  return (
    <Nav>
      <h1>
        <Link to='/'>LearnLocker</Link>
      </h1>
      <ul>
        <li>
          <span
            onClick={() => {
              props.authModalToggle()
              props.modalLogin()
            }}
          >
            Log In
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              props.authModalToggle()
              props.modalSignUp()
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
