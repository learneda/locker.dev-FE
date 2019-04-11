import React from 'react';
import { connect } from 'react-redux';
import { Grommet, TextInput } from 'grommet';
import styled from 'styled-components';

import { getSearchValue } from '../actions';

function DummySearch(props) {
  return (
    <Container>
      <Grommet theme={theme}>
        <TextInput
          size="small"
          placeholder="search"
          value={props.search_term}
          onChange={e => props.getSearchValue(e)}
        />
      </Grommet>
    </Container>
  );
}

const theme = {
  global: {
    focus: {
      border: {
        color: '#3f65f2'
      }
    }
  }
};

const Container = styled.div`
  input {
    width: 100% !important;
  }
  width: 40%;
  @media (max-width: 760px) {
    width: 70%;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const mapStateToProps = ({ search_term }) => ({ search_term });

export default connect(
  mapStateToProps,
  { getSearchValue }
)(DummySearch);
