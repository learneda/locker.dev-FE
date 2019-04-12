import React from 'react';
import { connect } from 'react-redux';
import { Grommet, TextInput, CheckBox } from 'grommet';
import styled from 'styled-components';

import { getSearchValue } from '../actions';

function Search(props) {
  return (
    <Wrapper>
      <Grommet theme={theme}>
        <Container>
          <Toggle>
            <CheckBox toggle />
          </Toggle>
          <TextInput
            size="small"
            placeholder="search"
            value={props.search_term}
            onChange={e => props.getSearchValue(e)}
          />
        </Container>
      </Grommet>
    </Wrapper>
  );
}

const theme = {
  global: {
    colors: {
      brand: '#3f65f2'
    },
    focus: {
      border: {
        color: '#3f65f2'
      }
    }
  }
};

const Wrapper = styled.div`
  input {
    width: 100% !important;
  }
  width: 40%;
  @media (max-width: 760px) {
    width: 70%;
    input {
      height: 35px !important;
    }
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
`;

const Toggle = styled.div`
  position: absolute;
  right: 0px;
  top: 10px;
  z-index: 1;
  @media (max-width: 760px) {
    top: 6px;
  }
`;

const mapStateToProps = ({ search_term }) => ({ search_term });

export default connect(
  mapStateToProps,
  { getSearchValue }
)(Search);
