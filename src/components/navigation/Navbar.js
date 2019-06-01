import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MobileNav from './MobileNav'
import NavLeft from './NavLeft'
import Notifications from './Notifications'
import Search from './Search'
import Auth from '../authentication/Auth'
import AddLink from '../utils/AddLink'
import ProfileDropDown from './ProfileDropDown'
import NavLanding from './NavLanding'
import { authModalToggle, modalSignUp, modalLogin } from 'actions'
import { customLayout, hoverBg } from '../mixins'
import burgerIcon from 'assets/svg/burger.svg'

const Navbar = props => {
  const [show, setShow] = useState(false)
  const showBurgerMenu = () => setShow(true)
  const hideBurgerMenu = () => setShow(false)

  const { auth, user, authModalToggle, modalSignUp, modalLogin } = props
  if (auth) {
    // When user logged in
    return (
      <NavWrapper>
        <MobileNav show={show} handleClose={hideBurgerMenu} />
        <Burger>
          <Search className='mobile-search' />
          <img
            src={burgerIcon}
            alt='burger'
            className='burger-icon'
            onClick={showBurgerMenu}
          />
        </Burger>

        <Nav className='main-nav' auth={auth}>
          <NavLeft />
          <Search className='main-search' />
          <NavRight>
            <Notifications />
            <AddLink />
            <ProfileDropDown auth={auth} user={user} />
          </NavRight>
        </Nav>
      </NavWrapper>
    )
  } else {
    // When user NOT logged in
    return (
      <>
        <Auth />
        <NavLanding
          authModalToggle={authModalToggle}
          modalSignUp={modalSignUp}
          modalLogin={modalLogin}
        />
      </>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

export default connect(
  mapStateToProps,
  { authModalToggle, modalSignUp, modalLogin }
)(Navbar)

const NavWrapper = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  position: sticky;
  top: 0;
  z-index: 3;

  @media (max-width: 760px) {
    .main-nav {
      display: none;
    }
    .main-search {
      display: none;
    }
  }
`

export const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  padding: 7.5px 0;
  margin: 0 auto;
  width: 80%;

  @media (max-width: 1400px) {
    width: 90%;
  }
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

    span {
      padding: 10px;
      font-weight: 700;
      border: transparent;
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

const NavRight = styled.div`
  display: flex;
  align-items: center;
  span {
    padding: 10px;
    margin: 0 10px 0 5px;
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

const Burger = styled.div`
  display: none;

  @media (max-width: 760px) {
    height: 50px;
    margin: 0 auto;
    padding: 5px;
    ${customLayout('space-between', 'center')}
    width: 90%;
  }

  input {
    width: 50%;
    height: 30px;
  }

  .burger-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms ease-in;

    &:hover {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }
`
