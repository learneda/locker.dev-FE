import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DummySearch from './DummySearch';
import Auth from './authentication/Auth';
import { customLayout, customWrapper, hoverBg } from './mixins';
import { modalState, modalLogin, modalSignUp } from '../actions/index';
import { authURL } from '../services/authURL';
import Toggle from './Toggle';

const NavWrapper = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  position: sticky;
  top: 0;
  z-index: 3;
`;

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
`;

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  padding: 7.5px 0;
  margin: 0 auto;
  margin-bottom: 40px;
  width: 80%;
  @media (max-width: 960px) {
    margin-bottom: 20px;
  }
  h1 {
    font-size: 3rem;
    font-weight: 700;
  }

  ul {
    ${customLayout('space-between')}

    span {
      padding: 10px;
      font-weight: 700;
      border: transparent;
      cursor: pointer;

      &:hover {
        border: 1px solid ${hoverBg} transparent;
        border-radius: 5px;
        background-color: ${hoverBg};
      }
    }
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
    margin-right: 10px;
    font-weight: 700;
    border: transparent;
    cursor: pointer;
    &:hover {
      border: 1px solid ${hoverBg} transparent;
      border-radius: 5px;
      background-color: ${hoverBg};
    }
  }
`;

const Burger = styled.div`
  border: 1px solid red;
  // min-height: 100vh;
`;

const Navbar = ({ modalState, modalLogin, modalSignUp, auth }) => {
  if (auth) {
    return (
      <NavWrapper>
        <Burger>
          <ul>
            <li>
              <Link to="/home">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/browse">
                <span>Browse</span>
              </Link>
            </li>
            <li>
              <a href={`${authURL}logout`}>Log out</a>
            </li>
          </ul>
        </Burger>

        <Nav>
          <button>Menu</button>
          <ul>
            <li>
              <Link to="/home">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/browse">
                <span>Browse</span>
              </Link>
            </li>
          </ul>
          <DummySearch />
          <NavRight>
            <Toggle />
            <a href={`${authURL}logout`}>
              <img
                src={auth.profile_picture}
                className="auth-icon"
                alt="avatar"
              />
            </a>
          </NavRight>
        </Nav>
      </NavWrapper>
    );
  } else {
    return (
      <Fragment>
        <Auth />
        <Wrapper>
          <Nav>
            <h1>
              <Link to="/home">Learned</Link>
            </h1>
            <ul>
              <li>
                <span
                  onClick={() => {
                    modalState();
                    modalLogin();
                  }}
                >
                  Log In
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    modalState();
                    modalSignUp();
                  }}
                >
                  Sign Up
                </span>
              </li>
            </ul>
          </Nav>
        </Wrapper>
      </Fragment>
    );
  }
};

const mapStateToProps = ({ modalState, auth }) => {
  return {
    modalOpen: modalState.modalOpen,
    auth
  };
};

export default connect(
  mapStateToProps,
  { modalState, modalLogin, modalSignUp }
)(Navbar);
