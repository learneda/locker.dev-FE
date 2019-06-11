import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { customLayout, hoverBg } from 'components/mixins'

const NavLanding = ({ authModalToggle, modalLogin, modalSignUp }) => {
  return (
    <Nav>
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

const Nav = styled.nav`
  border: 2px solid green;
  ${customLayout('space-between', 'center')}
  padding: 7.5px 0;
  margin: 20px 0;

  h1 {
    border: 2px solid blue;
    font-size: 3rem;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    @media (max-width: 500px) {
      font-size: 2.1rem;
    }
  }

  ul {
    /* border: 2px solid orange; */
    ${customLayout('space-between')}
    li {
      margin-right: 1rem;
    }
    li:last-child {
      margin-right: 0;
      /* border: 2px solid purple; */
    }
    @media (max-width: 900px) {
      li {
        margin-right: 0.5rem;
      }
      li:last-child {
        margin-right: 0;
      }
    }

    span {
      border: 2px solid salmon;
      padding: 10px;
      font-weight: 700;
      /* border: transparent; */
      cursor: pointer;
      transition: 200ms ease-out;
      background: ${props => (props.auth ? null : '#fff')};
      border-radius: 7px;

      @media (max-width: 400px) {
        font-size: 1.4rem;
        padding: 7px;
      }

      &:hover {
        border: 1px solid ${hoverBg} transparent;
        border-radius: 5px;
        background-color: ${hoverBg};
      }
    }
  }
  .active {
    border: 1px solid ${hoverBg} transparent;
    border-radius: 5px;
    background-color: ${hoverBg};
    padding: 10px 0;
  }
  .auth-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
`
