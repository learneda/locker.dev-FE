import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import burgerIcon from 'assets/svg/burger.svg'
import Notifications from '../Bell'
import Search from '../Search'
import ProfileDropDown from './ProfileDropDown'
import MobileNav from './MobileNav'
import { customLayout, hoverBg } from 'components/mixins'

const NavMobile = props => {
  const { user } = props
  const [show, setShow] = useState(false)
  const showBurgerMenu = () => setShow(true)
  const hideBurgerMenu = () => setShow(false)
  return (
    <>
      <Burger>
        <Search className='mobile-search' />
        <div className='mobile-right'>
          <Notifications className='bell' />
          <ProfileDropDown
            onClick={showBurgerMenu}
            className='profile'
            user={user}
          />
        </div>
      </Burger>
    </>
  )
}

NavMobile.propTypes = {}

export default NavMobile

const Burger = styled.div`
  display: none;

  @media (max-width: 760px) {
    height: 50px;
    width: 100%;
    padding: 0 5px;
    ${customLayout('space-between', 'center')}
  }
  .auth-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  input {
    width: 50%;
    height: 30px;
    /* border: 1px solid blue; */
  }
  .mobile-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid green; */
  }
  .bell {
    margin: 0;
    padding: 0;
    /* border: 1px solid blue; */
  }
  .profile {
    border: 1px solid purple;
  }
  .burger-icon {
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    /* border: 1px solid red; */
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms ease-in;
    &:hover {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }
  .auth-icon {
    border: 1px solid red;
  }
`
