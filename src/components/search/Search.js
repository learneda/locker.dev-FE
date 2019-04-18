import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Grommet, TextInput, CheckBox } from 'grommet';
import styled from 'styled-components';

import SearchUsersDropDown from './SearchUsersDropDown';
import { getSearchValue } from '../../actions';

function Search(props) {
  const [toggle, set] = useState(false);
  const [search, setSearch] = useState('');

  const handleChange = useCallback(e => {
    set(e.target.checked);
    setSearch('');
  }, []);
  const handleSearch = e =>
    toggle ? setSearch(e.target.value) : props.getSearchValue(e);

  return (
    <Fragment>
      <Wrapper>
        <Grommet theme={theme}>
          <Container>
            <Toggle>
              <CheckBox toggle checked={toggle} onChange={handleChange} />
            </Toggle>
            <TextInput
              size="small"
              placeholder={toggle ? 'Search Users' : 'Search Bookmarks'}
              value={toggle ? search : props.search_term}
              onChange={handleSearch}
            />
          </Container>
        </Grommet>
      </Wrapper>
      {toggle && search.length > 0 && (
        <DropDown>
          <SearchUsersDropDown search={search} />
        </DropDown>
      )}
    </Fragment>
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

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: 500;
  height: 500px;
  position: absolute;
  left: 34.5%;
  overflow: auto;
  top: 66px;
  width: 31.5%;
  @media (max-width: 759px) {
    left: 6%;
    top: 57px;
    width: 61%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`;

const mapStateToProps = ({ search_term }) => ({ search_term });

export default connect(
  mapStateToProps,
  { getSearchValue }
)(Search);
