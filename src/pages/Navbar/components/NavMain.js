import React from 'react'
import styled from 'styled-components'
import AddLink from '../AddLink'
import NavLeft from './NavLeft'
import Notifications from '../Notifications'
import Search from '../Search'
import ProfileDropDown from './ProfileDropDown'
import { customLayout, hoverBg } from 'components/mixins'
import PropTypes from 'prop-types'

const NavMain = props => {
  const { user } = props
  return (
    <Nav className='main-nav'>
      <NavLeft />
      <Search className='main-search' />
      <NavRight>
        <Notifications />
        <AddLink />
        <ProfileDropDown user={user} />
      </NavRight>
    </Nav>
  )
}

NavMain.propTypes = {}

export default NavMain

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
  h1 {
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
    ${customLayout('space-between')}

    li {
      margin-right: 1rem;
    }

    li:last-child {
      margin-right: 0;
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
      font-weight: 700;
      border: transparent;
      cursor: pointer;
      transition: 200ms ease-out;
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

const NavRight = styled.div`
  display: flex;
  align-items: center;
  span {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 3rem;
    font-weight: 700;
    border: transparent;
    border-radius: 5px;
    background-color: #3f65f2;
    color: white;
    cursor: pointer;
    transition: 200ms ease-out;
    &:hover {
      border: 1px solid ${hoverBg} transparent;
      border-radius: 5px;
      background-color: #3059f3;
    }
  }
  .bell-icon {
    cursor: pointer;
  }
`
