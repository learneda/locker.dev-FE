// import React, { useState, useCallback, useEffect, useRef } from 'react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import SearchUsersDropDown from './SearchUsersDropDown'
import * as searchActions from './searchActions'

function Search(props) {
  // const DropDownNode = useRef()
  const { searchTerm, setSearchTerm, resetSearchTerm } = props
  // const [toggle, setToggle] = useState(false)
  // const [search, setSearch] = useState('')
  // const [visible, setVisible] = useState(false)

  // const handleChange = useCallback(e => {
  //   setToggle(e.target.checked)
  //   setSearch('')
  // }, [])

  // const handleSearch = e => {
  //   // toggle && setVisible(true)
  //   toggle ? setSearch(e.target.value) : setSearchTerm(e)
  // }

  // const handleRefClick = e => {
  //   if (DropDownNode.current) {
  //     setVisible(false)
  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener('click', handleRefClick)
  //   return () => {
  //     document.removeEventListener('click', handleRefClick)
  //   }
  // }, [])

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
      case '/home':
        placeholder = 'Feed'
        break
      case '/home/feed':
        placeholder = 'Feed'
        break
      case '/home/saved':
        placeholder = 'Saved'
        break
      case '/home/locker':
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
}

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

const Toggle = styled.div`
  position: absolute;
  right: 0px;
  top: 10px;
  z-index: 1;
  @media (max-width: 760px) {
    top: 6px;
  }
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
`
