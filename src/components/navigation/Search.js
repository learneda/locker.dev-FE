// import React, { useState, useCallback, useEffect, useRef } from 'react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import * as searchActions from './searchActions'

function Search(props) {
  const { searchTerm, setSearchTerm, resetSearchTerm } = props

  useEffect(() => {
    if (props.searchTerm) {
      resetSearchTerm()
    }
  }, [props.location.pathname])

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
        placeholder = 'Feed'
        break
      case '/feed':
        placeholder = 'Feed'
        break
      case '/saved':
        placeholder = 'Saved'
        break
      case '/locker':
        placeholder = 'Locker'
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
        onChange={setSearchTerm}
        id='search-input'
      />
    )
  }
  //todo: DRY-UP and CLEAN-UP SEARCH COMPONENT SELECTION
  return (
    <>
      <Wrapper>
        <Container>
          {/* <Toggle>
              <CheckBox toggle checked={toggle} onChange={handleChange} />
            </Toggle> */}
          {displaySearch()}
        </Container>
      </Wrapper>
    </>
  )
}

// {visible && toggle && search.length > 0 && (
//   <DropDown ref={DropDownNode}>
//     <SearchUsersDropDown search={search} />
//   </DropDown>
// )}
const mapStateToProps = ({ searchTerm }) => ({
  searchTerm,
})

export default connect(
  mapStateToProps,
  { ...searchActions }
)(withRouter(Search))

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
`

const Container = styled.div`
  position: relative;
  display: flex;
`
