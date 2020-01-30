import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import SearchUsersDropDown from 'pages/Navbar/components/SearchUsersDropDown'
import * as searchActions from 'pages/Navbar/store/searchActions'
import useOnClickOutside from 'use-onclickoutside'

const Search = props => {
  const { searchTerm, location, setSearchTerm, resetSearchTerm } = props
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useOnClickOutside(ref, e => {
    if (e.target.id === 'search-input') {
      return
    }
    setVisible(false)
  })

  const handleSearch = e => {
    setSearchTerm(e)
    if (
      location.pathname === '/' ||
      location.pathname.includes('profile') ||
      location.pathname.includes('notifications')
    ) {
      setVisible(true)
    }
  }
  useEffect(() => {
    if (searchTerm.length) {
      resetSearchTerm()
    }
    return () => {
      if (searchTerm.length) {
        resetSearchTerm()
      }
    }
  }, [location.pathname])

  //TODO: Make this DRY
  const displaySearch = () => {
    let placeholder
    let path = location.pathname
    if (path.split('/')[1] === 'profile') {
      if (path.split('/').length === 3) {
        path = '/profile'
      } else {
        path = path.split('/')[3]
      }
    }
    switch (path) {
      case '/':
        placeholder = 'Users'
        break
      case '/feed':
        placeholder = 'Users'
        break
      case '/saved':
        placeholder = 'Users'
        break
      case '/locker':
        placeholder = 'Locker'
        break
      case '/locker/articles':
        placeholder = 'Articles'
        break
      case '/locker/courses':
        placeholder = 'Courses'
        break
      case '/locker/videos':
        placeholder = 'Videos'
        break
      case '/locker/podcasts':
        placeholder = 'Podcasts'
        break
      case '/locker/books':
        placeholder = 'Books'
        break
      case '/locker/links':
        placeholder = 'Links'
        break
      case '/browse':
        placeholder = 'Articles'
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
      case '/notifications':
        placeholder = 'Users'
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
        placeholder = 'Users'
        break
      case '/settings/profile':
        placeholder = 'Users'
        break
      case '/settings/integrations':
        placeholder = 'Users'
        break
      case '/profile':
        placeholder = 'Users'
        break
      case '/profile/saved':
        placeholder = 'Users'
        break
      case '/profile/following':
        placeholder = 'Users'
        break
      case '/profile/followers':
        placeholder = 'Users'
        break
      default:
        placeholder = 'Users'
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
    <Wrapper>
      <Container>{displaySearch()}</Container>
      <DropDown
        ref={ref}
        onClick={() => {
          setVisible(false)
        }}
      >
        {searchTerm.length && visible ? (
          <SearchUsersDropDown searchTerm={searchTerm} />
        ) : null}
      </DropDown>
    </Wrapper>
  )
}

const mapStateToProps = ({ search }) => ({
  searchTerm: search.searchTerm,
})

export default connect(mapStateToProps, { ...searchActions })(
  withRouter(Search)
)

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  resetSearchTerm: PropTypes.func.isRequired,
}
const Wrapper = styled.div``

const Container = styled.div`
  position: relative;
  display: flex;
  #search-input {
    width: 170px;
    font-size: 1.2rem;
    letter-spacing: 0.8px;
    height: 35px;
    outline: none;
    border-radius: 21px;
    background-color: #f5f8fa;
    border: 1px solid lightgrey;
    transition: all 0.2s ease-in-out;
    padding: 8px 32px 8px 12px;
    color: #14171a;
    @media (max-width: 500px) {
      width: 150px;
    }
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
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 60px;
  width: 260px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: 500;
  max-height: 500px;
  overflow: auto;
  @media (max-width: 650px) {
    right: 10px;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    right: -15px;
    width: 100vw;
  }
`
