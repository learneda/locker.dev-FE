import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Auth from './Auth';
import { customLayout, Wrapper, hoverBg } from './mixins';
import { modalState } from '../actions/index';
import { authURL } from '../services/authURL';

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  padding: 30px 0;
  position: sticky;
  top: 0;
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

const Navbar = ({ modalState, auth }) => {
  if (auth) {
    return (
      <Wrapper>
        <Nav>
          <h1>
            <Link to="/home">Learned</Link>
          </h1>
          <ul>
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
      <React.Fragment>
        <Auth />
        <Wrapper>
          <Nav>
            <h1>
              <Link to="/home">Learned</Link>
            </h1>
            <ul>
              <li>
                <span onClick={modalState}>Log In</span>
              </li>
              <li>
                <span onClick={modalState}>Sign Up</span>
              </li>
            </ul>
          </Nav>
        </Wrapper>
      </React.Fragment>
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
  { modalState }
)(Navbar);
