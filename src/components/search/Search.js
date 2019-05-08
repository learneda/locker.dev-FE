import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grommet, TextInput, CheckBox } from 'grommet';
import styled from 'styled-components';

import SearchUsersDropDown from './SearchUsersDropDown';
import { setSearchTerm, resetSearchTerm } from '../../actions';

function Search(props) {
  const { resetSearchTerm } = props;
  const node = useRef();
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    e => {
      setToggle(e.target.checked);
      setSearch('');
      resetSearchTerm();
    },
    [resetSearchTerm]
  );

  const handleSearch = e => {
    toggle && setVisible(true);
    toggle ? setSearch(e.target.value) : props.setSearchTerm(e);
  };

  const handleRefClick = e => {
    if (node.current) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleRefClick);
    return () => {
      document.removeEventListener('click', handleRefClick);
    };
  }, []);

  const displayHomeSearchComponent = () => {
    const Tabs = ['Feed', 'Bookmarks', 'Likes'];
    return (
      <TextInput
        size='small'
        placeholder={
          toggle ? 'Search Users' : `Search ${Tabs[props.homeIndex]}`
        }
        value={toggle ? search : props.searchTerm}
        onChange={handleSearch}
        id='search-input'
      />
    );
  };

  const displayBrowseSearchComponent = () => {
    const Tabs = ['Courses', 'Articles', 'Videos'];
    const placeholder = Tabs[props.browseIndex];
    return (
      <TextInput
        size='small'
        placeholder={toggle ? 'Search Users' : `Search ${placeholder}`}
        value={toggle ? search : props.searchTerm}
        onChange={handleSearch}
        id='search-input'
      />
    );
  };

  const displayProfileSearchComponent = () => {
    const Tabs = ['Bookmarks', 'Likes'];
    const placeholder = Tabs[props.profileIndex];
    return (
      <TextInput
        size='small'
        placeholder={toggle ? 'Search Users' : `Search ${placeholder}`}
        value={toggle ? search : props.searchTerm}
        onChange={handleSearch}
        id='search-input'
      />
    );
  };

  //TODO: Make this DRY
  const displaySearch = () => {
    let placeholder;
    const path = props.location.pathname;
    console.log('path', path);
    switch (path) {
      case '/home':
        placeholder = 'Feed';
        break;
      case '/home/feed':
        placeholder = 'Feed';
        break;
      case '/home/bookmarks':
        placeholder = 'Bookmarks';
        break;
      case '/home/likes':
        placeholder = 'Likes';
        break;
      case '/browse':
        placeholder = 'Courses';
        break;
      case '/browse/courses':
        placeholder = 'Courses';
        break;
      case '/browse/articles':
        placeholder = 'Articles';
        break;
      case '/browse/videos':
        placeholder = 'Videos';
        break;
      case '/social':
        placeholder = 'Following';
        break;
      case '/social/following':
        placeholder = 'Following';
        break;
      case '/social/followers':
        placeholder = 'Followers';
        break;
      case '/social/suggested':
        placeholder = 'Suggested';
        break;
      case '/social/meetups':
        placeholder = 'Meetups';
    }
    return (
      <TextInput
        size='small'
        placeholder={toggle ? 'Search Users' : `Search ${placeholder}`}
        value={toggle ? search : props.searchTerm}
        onChange={handleSearch}
        id='search-input'
      />
    );
  };
  //todo: DRY-UP and CLEAN-UP SEARCH COMPONENT SELECTION
  return (
    <>
      <Wrapper>
        <Grommet theme={theme}>
          <Container>
            <Toggle>
              <CheckBox toggle checked={toggle} onChange={handleChange} />
            </Toggle>
            {displaySearch()}
          </Container>
        </Grommet>
      </Wrapper>
      {visible && toggle && search.length > 0 && (
        <DropDown ref={node}>
          <SearchUsersDropDown search={search} />
        </DropDown>
      )}
    </>
  );
}

const mapStateToProps = ({ searchTerm, browse, home, profile }) => ({
  searchTerm,
  browseIndex: browse.index,
  homeIndex: home.index,
  profileIndex: profile.index,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setSearchTerm, resetSearchTerm }
  )(Search)
);

const theme = {
  global: {
    colors: {
      brand: '#3f65f2',
    },
    focus: {
      border: {
        color: '#3f65f2',
      },
    },
  },
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
  max-height: 500px;
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
