import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Notifications from './Notifications';
import Search from '../search/Search';
import Auth from '../authentication/Auth';
import AddLink from '../utils/AddLink';
import ProfileDropDown from './ProfileDropDown';
import { authModalToggle, modalSignUp, modalLogin } from '../../actions';
import { authURL } from '../../services/authURL';
import { customLayout, hoverBg } from '../mixins';
import burgerIcon from '../../assets/svg/burger.svg';
import closeIcon from '../../assets/svg/close.svg';

class Navbar extends Component {
  state = { show: false };

  showBurgerMenu = () => this.setState({ show: true });
  hideBurgerMenu = () => this.setState({ show: false });

  render() {
    const { auth, authModalToggle, modalSignUp, modalLogin } = this.props;
    if (auth) {
      // When user logged in
      return (
        <NavWrapper>
          <MobileNav show={this.state.show} handleClose={this.hideBurgerMenu} />

          <Burger>
            <Search />
            <img
              src={burgerIcon}
              alt='burger'
              className='burger-icon'
              onClick={this.showBurgerMenu}
            />
          </Burger>

          <Nav className='main-nav' auth={auth}>
            <ul>
              <li>
                <NavLink to='/home' activeClassName='active'>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/browse' activeClassName='active'>
                  <span>Browse</span>
                </NavLink>
              </li>
            </ul>

            <Search />

            <NavRight>
              <Notifications />
              <AddLink />
              <ProfileDropDown auth={auth} />
            </NavRight>
          </Nav>
        </NavWrapper>
      );
    } else {
      // When user NOT logged in
      return (
        <Fragment>
          <Auth />
          <Nav style={{ marginTop: '20px' }}>
            <h1>
              <Link to='/home'>LearnLocker</Link>
            </h1>
            <ul>
              <li>
                <span
                  onClick={() => {
                    authModalToggle();
                    modalLogin();
                  }}
                >
                  Log In
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    authModalToggle();
                    modalSignUp();
                  }}
                >
                  Sign Up
                </span>
              </li>
            </ul>
          </Nav>
        </Fragment>
      );
    }
  }
}

const MobileNav = ({ handleClose, show }) => {
  const showHideClassName = show
    ? 'burger display-block'
    : 'burger display-none';

  return (
    <BurgerMenu>
      <div className={showHideClassName}>
        <div className='close-btn'>
          <img
            src={closeIcon}
            alt='close-icon'
            onClick={handleClose}
            className='close-icon'
          />
        </div>
        <ul className='burger-main'>
          <li onClick={handleClose}>
            <Link to='/home'>
              <span>Home</span>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to='/browse'>
              <span>Browse</span>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to='/settings'>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <a href={`${authURL}logout`}>Log Out</a>
          </li>
        </ul>
      </div>
    </BurgerMenu>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  { authModalToggle, modalSignUp, modalLogin }
)(Navbar);

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
  }
`;

const Nav = styled.nav`
  * {
    outline: 1px solid red;
  }
  ${customLayout('space-between', 'center')}
  padding: 7.5px 0;
  margin: 0 auto;
  margin-bottom: 40px;
  width: 80%;

  @media (max-width: 1400px) {
    width: 90%;
  }
  @media (max-width: 960px) {
    margin-bottom: 20px;
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
      margin-right: 1.5rem;
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
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  span {
    padding: 10px;
    margin: 0 20px;
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
`;

const Burger = styled.div`
  display: none;

  @media (max-width: 760px) {
    height: 50px;
    margin: 0 auto;
    margin-bottom: 20px;
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
`;

const BurgerMenu = styled.div`
  // min-height: 100vh;

  .burger {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    z-index: 10;

    animation: fadeBackground 200ms;

    @keyframes fadeBackground {
      from {
        background-color: transparent;
      }
      to {
        background-color: #fff;
      }
    }
  }

  .close-btn {
    ${customLayout('flex-end')}
    // border: 1px solid red;
    padding: 20px 8%;

    .close-icon {
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
  }

  .burger-main {
    ${customLayout('center', 'center')}
    flex-wrap: wrap;
    margin: 20px 0;

    li {
      width: 100%;
      padding: 20px 0;
      text-align: center;
      font-size: 3rem;
      opacity: 0.8;
      transition: 200ms ease-in;

      &:hover {
        opacity: 1;
        transition: 200ms ease-in;
        background-color: #e6e8f3;
      }
    }
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;
