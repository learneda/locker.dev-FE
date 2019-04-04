import React, { useState } from 'react';
import { TextInput } from 'grommet';
import {getSearchValue} from '../actions';
import {connect} from 'react-redux';

function DummySearch(props) {

  return (
    <div style={{ width: '500px' }}>
      <TextInput
        size="small"
        placeholder="search"
        value={props.search_term}
        onChange={(e) => props.getSearchValue(e)}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    search_term: state.search_term
  };
};

export default connect(mapStateToProps, {getSearchValue})(DummySearch);