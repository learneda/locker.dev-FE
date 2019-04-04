import React, { useState } from 'react';
import { TextInput } from 'grommet';
import {connect} from 'react-redux';
import { getSearchValue } from '../actions/index';

function DummySearch(props) {
  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  return (
    <TextInput
      size="small"
      placeholder="search"
      value={props.search_term}
      onChange={(e)=>props.getSearchValue(e)}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    search_term: state.search_term
  };
};

export default connect(mapStateToProps, {getSearchValue})(DummySearch);