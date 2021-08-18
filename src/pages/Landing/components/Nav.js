import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import brand from 'assets/svg/learnlockerbrand2.svg'

const NavLanding = props => {
  const { authModalOpen, modalLogin, modalSignUp } = props

  return (
    <Nav>
      <h1>
        <Link to='/'>learnlocker.app</Link>
      </h1>
      <img src={brand} alt='brand' />
      <ul>
        <li>
          <button
            onClick={() => {
              authModalOpen()
              modalLogin()
            }}
          >
            Log In
          </button>
        </li>
        <li>
          <button
            className='signup'
            onClick={() => {
              authModalOpen()
              modalSignUp()
            }}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </Nav>
  )
}
export default NavLanding

NavLanding.propTypes = {
  authModalOpen: PropTypes.func.isRequired,
  modalLogin: PropTypes.func.isRequired,
  modalSignUp: PropTypes.func.isRequired,
}
const Nav = styled.nav`
  width: 100%;
  .signup {
    background: #1da1f2;
    color: #fff;
    transition: background 300ms ease-out;
    @media (max-width: 500px) {
      display: none;
    }
    &:hover {
      background: #0071b2;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0071b2;
  height: 50px;
  padding: 0 3.5%;
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    width: 200px;
    letter-spacing: 0.8px;
    @media (max-width: 500px) {
      width: 150px;
      font-size: 2rem;
    }
    a {
      color: #14171a;
      &:hover {
        color: orangered;
      }
    }
  }
  img {
    height: 35px;
    width: 35px;
    &:hover {
      filter: invert(150%);
      cursor: pointer;
    }
  }
  ul {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 500px) {
      width: 150px;
    }
    li {
      margin-right: 2rem;
      @media (max-width: 500px) {
        margin-right: 0;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }

  button {
    border: 1px solid #1da1f2;
    color: #1da1f2;
    padding: 6px 12px;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background 300ms ease-out;
    border-radius: 100px;
    &:hover {
      background: #eaf5fd;
    }
  }
`
