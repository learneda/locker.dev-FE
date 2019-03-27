import React from 'react';
import styled from 'styled-components';
import { customLayout, Wrapper, hoverBg } from './mixins';
import Auth from './Auth';
import { Link } from 'react-router-dom';

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

const Navbar = () => {
  // if user not logged in/signed up
  return (
    <React.Fragment>
      <Auth />
      <Wrapper>
        <Nav>
          <h1>
            <Link to="/">Learned</Link>
          </h1>
          <ul>
            <li>
              <span
                onClick={() =>
                  (document.querySelector('.login').style.display = 'flex')
                }
              >
                Log In
              </span>
            </li>
            <li>
              <span
                onClick={() =>
                  (document.querySelector('.login').style.display = 'flex')
                }
              >
                Sign Up
              </span>
            </li>
          </ul>
        </Nav>
      </Wrapper>
    </React.Fragment>
  );
  // when logged in:
  // return(
  //   <Nav>
  //     <a href="#">Lernedd</a>
  //     <ul>
  //     <li><a href="#">Home</a></li>
  //     <li><a href="#">Browse</a></li>
  //     <li><a href="#">Profile</a></li> {/* Dropdown for log out*/}
  //     </ul>
  //   </Nav>
  // );
};

export default Navbar;
