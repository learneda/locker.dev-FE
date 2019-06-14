import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { customLayout, hoverBg } from 'components/mixins'
import learnLocker from 'assets/img/learnlocker2.png'
import brand from 'assets/svg/learnlockerbrand2.svg'
const NavLanding = ({ authModalToggle, modalLogin, modalSignUp }) => {
  return (
    <Nav>
      <h1>
        <Link to='/'>locker.dev</Link>
      </h1>
      <img src={brand} />
      <ul>
        <li>
          <button
            onClick={() => {
              authModalToggle()
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
              authModalToggle()
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

const Nav = styled.nav`
  width: 100%;
  .signup {
    background: #1da1f2;
    color: #fff;
    transition: background 300ms ease-out;
    &:hover {
      background: #0071b2;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #0071b2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  height: 50px;
  padding: 0 3.5%;
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    width: 200px;
    a {
      color: #14171a;
      &:hover {
        color: #0071b2;
      }
    }
  }
  img {
    height: 35px;
    width: 35px;
  }
  ul {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    li {
      margin-right: 2rem;
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
    cursor: pointer;
    transition: background 300ms ease-out;
    border-radius: 100px;
    &:hover {
      background: #eaf5fd;
    }
  }
`
