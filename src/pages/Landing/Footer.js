import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = props => (
  <Nav>
    <Link to='#'>Privacy</Link>
    <Link to='#'>Terms</Link>
    <Link to='#'>Cookies</Link>
    <Link to='#'>Help</Link>
    <Link>&copy; 2019 locker.dev</Link>
  </Nav>
)

export default Footer

const Nav = styled.nav`
  width: 100%;
  border-top: 1px solid #e6ecf0;
  font-size: 1.2rem;
  background: #fefefe;
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: #aab8c2;
    cursor: pointer;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    height: 20px;
    display: flex;
    align-items: center;
    a {
      color: #aab8c2;
      cursor: pointer;
      padding: 15px 2px 0px;
    }
  }
`
