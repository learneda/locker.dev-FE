import React from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'grommet';

import { getSearchValue } from '../actions';

function DummySearch(props) {
  return (
    <div style={{ width: '30%' }}>
      <TextInput
        size="small"
        placeholder="search"
        value={props.search_term}
        onChange={e => props.getSearchValue(e)}
      />
    </div>
  );
}
const mapStateToProps = ({ search_term }) => ({ search_term });

export default connect(
  mapStateToProps,
  { getSearchValue }
)(DummySearch);
