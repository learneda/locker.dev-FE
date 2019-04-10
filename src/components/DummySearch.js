import React from 'react';
import { connect } from 'react-redux';
import { Grommet, TextInput } from 'grommet';

import { getSearchValue } from '../actions';

function DummySearch(props) {
  return (
    <div style={{ width: '30%' }}>
      <Grommet theme={theme}>
        <TextInput
          size="small"
          placeholder="search"
          value={props.search_term}
          onChange={e => props.getSearchValue(e)}
        />
      </Grommet>
    </div>
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
const mapStateToProps = ({ search_term }) => ({ search_term });

export default connect(
  mapStateToProps,
  { getSearchValue }
)(DummySearch);
