import React, { Component } from 'react';
import styled from 'styled-components';
import { customWrapper } from './mixins';

class Sidebar extends Component {
  render() {
    return (
      <Wrapper>
        <h3>Categories</h3>
        <button>+ Add a category</button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  // border: 1px solid red;
  border-right: 5px solid #89a1ff;
  ${customWrapper('20%')}
  height: 100vh;
  padding: 20px 0;

  @media (max-width: 960px) {
    display: none;
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  button {
    border: none;
    background: none;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    opacity: 0.8;
    transition: 200ms ease-out;

    &:hover {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }
`;

export default Sidebar;
