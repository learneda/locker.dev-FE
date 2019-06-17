// import React, { useState, useCallback, useEffect, useRef } from 'react'
import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import SearchUsersDropDown from 'pages/Navbar/components/SearchUsersDropDown'
import * as searchActions from './store/searchActions'
import useOnClickOutside from 'use-onclickoutside'

const Search = props => {
  const { searchTerm, setSearchTerm, resetSearchTerm } = props
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useOnClickOutside(ref, () => setVisible(false))

  const handleSearch = e => {
    setSearchTerm(e)
    setVisible(true)
  }

  //TODO: Make this DRY
  const displaySearch = () => {
    let placeholder
    let path = props.location.pathname
    if (path.split('/')[1] === 'profile') {
      if (path.split('/').length === 3) {
        path = '/profile'
      } else {
        path = path.split('/')[3]
      }
    }
    switch (path) {
      case '/':
        placeholder = 'Users or Tags'
        break
      case '/feed':
        placeholder = 'Users or Tags'
        break
      case '/saved':
        placeholder = 'Users or Tags'
        break
      case '/locker':
        placeholder = 'Users or Tags'
        break
      case '/browse':
        placeholder = 'Courses'
        break
      case '/browse/courses':
        placeholder = 'Courses'
        break
      case '/browse/articles':
        placeholder = 'Articles'
        break
      case '/browse/videos':
        placeholder = 'Videos'
        break
      case '/browse/books':
        placeholder = 'Books'
        break
      case '/browse/podcasts':
        placeholder = 'Podcasts'
        break
      case '/social':
        placeholder = 'Following'
        break
      case '/social/following':
        placeholder = 'Following'
        break
      case '/social/followers':
        placeholder = 'Followers'
        break
      case '/social/suggested':
        placeholder = 'Suggested'
        break
      case '/social/meetups':
        placeholder = 'Meetups'
        break
      case '/settings':
        placeholder = 'Profile'
        break
      case '/settings/profile':
        placeholder = 'Profile'
        break
      case '/settings/integrations':
        placeholder = 'Integrations'
        break
      case '/profile':
        placeholder = 'Saved'
        break
      case '/profile/saved':
        placeholder = 'Saved'
        break
      case '/profile/following':
        placeholder = 'Following'
        break
      case '/profile/followers':
        placeholder = 'Followers'
        break
      default:
        placeholder = 'Default'
    }
    return (
      <input
        size='small'
        height='45px'
        placeholder={`Search ${placeholder}`}
        value={searchTerm}
        onChange={handleSearch}
        id='search-input'
      />
    )
  }
  //todo: DRY-UP and CLEAN-UP SEARCH COMPONENT SELECTION
  return (
    <>
      <Wrapper>
        <Container>{displaySearch()}</Container>
        <DropDown onClick={() => setVisible(false)}>
          {searchTerm.length && visible ? (
            <SearchUsersDropDown search={searchTerm} />
          ) : null}
        </DropDown>
      </Wrapper>
    </>
  )
}

const mapStateToProps = ({ searchTerm }) => ({
  searchTerm,
})

export default connect(
  mapStateToProps,
  { ...searchActions }
)(withRouter(Search))

const Wrapper = styled.div`
  span {
    &:hover {
      border: 1px solid dodgerblue;
    }
  }
  input {
    width: 200px;
    font-size: 12px;
    letter-spacing: 0.8px;
    height: 35px;
    outline: none;
    border-radius: 21px;
    background-color: #f5f8fa;
    border: 1px solid #e6ecf0;
    transition: all 0.2s ease-in-out;
    padding: 8px 32px 8px 12px;
    color: #14171a;
    &:hover {
      border: 1px solid dodgerblue;
    }
    &:focus {
      border: 1px solid dodgerblue;
      background-color: #fff;
      color: #14171a;
    }
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
`
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: 500;
  max-height: 500px;
  position: absolute;
  overflow: auto;
  top: 50px;
  width: 300px;
  @media (max-width: 759px) {
    left: 6%;
    top: 57px;
    width: 61%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`
