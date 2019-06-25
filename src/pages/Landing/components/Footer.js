import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => (
  <Nav>
    <Link to='#'>Privacy</Link>
    <Link to='#'>Terms</Link>
    <a
      href='https://www.websitepolicies.com/policies/view/LSlW4YXe'
      target='_blank'
      rel='noopener noreferrer'
    >
      Cookies
    </a>
    <Link to='#'>Help</Link>
    <Link to='#'>&copy; 2019 locker.dev</Link>
  </Nav>
)

export default Footer

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-top: 1px solid #e6ecf0;
  font-size: 1.2rem;
  background: #fefefe;
  padding: 15px 6vw;
  a {
    color: #aab8c2;
    cursor: pointer;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    height: 20px;
    a {
      padding: 15px 2px 0px;
    }
  }
`
