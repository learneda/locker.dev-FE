import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DummySearch from './DummySearch';
import Auth from './authentication/Auth';
import { customLayout, customWrapper, hoverBg } from './mixins';
import { modalState, modalLogin, modalSignUp } from '../actions/index';
import { authURL } from '../services/authURL';

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
`;

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  padding: 30px 0;
  margin-bottom: 40px;
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
`;

const Navbar = ({ modalState, modalLogin, modalSignUp, auth }) => {
  if (auth) {
    return (
      <Wrapper>
        <Nav>
          <ul>
            <li>
              <Link to="/home">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/browse">
                <span>Browse</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
            </li>
          </ul>
          <DummySearch />
          <ul>
            <li>
              <span>
                <a href={`${authURL}logout`}>Logout</a>
              </span>
            </li>
          </ul>
        </Nav>
      </Wrapper>
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
