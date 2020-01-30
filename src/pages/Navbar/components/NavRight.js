import React, { useState, useRef, useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components'
import AddLink from 'containers/AddLink'
import Search from 'containers/Search'
import SearchSVG from 'assets/react-svg/SearchSVG'
import useOnClickOutside from 'use-onclickoutside'
import { useMedia } from 'use-media'
import Bell from 'containers/Bell'

const NavRight = props => {
  const {
    user,
    location,
    toggleSearch,
    setSearchOff,
    resetSearchTerm,
    search: { searchTerm, isSearch },
  } = props
  const isLarge = useMedia({ minWidth: 650 })
  const isMobile = useMedia({ maxWidth: 450 })
  const ref = useRef()
  const [active, setActive] = useState(false)

  useOnClickOutside(ref, e => {
    if (e.target.className === 'search-wrap') {
      return
    }
    if (e.target.id === 'search-input') {
      return
    }
    if (e.target.className || e.target.className.includes('dd-search')) {
      return
    }
    if (isSearch) {
      setActive(false)
      setSearchOff()
    }
  })

  useEffect(() => {
    if (!isMobile) {
      if (isSearch) {
        setSearchOff()
        setActive(false)
      }
      if (searchTerm.length) {
        resetSearchTerm()
      }
    }
    if (searchTerm.length) {
      resetSearchTerm()
    }
  }, [isMobile])

  return (
    <StyledNavRight>
      {isMobile ? (
        <div
          ref={ref}
          className='search-wrap'
          style={
            active
              ? { border: '1px solid dodgerblue' }
              : { border: '1px solid rgb(191, 197, 201)' }
          }
          onClick={() => {
            setActive(prev => !prev)
            toggleSearch()
          }}
        >
          <SearchSVG active={active} />
        </div>
      ) : (
        <Search />
      )}
      {isLarge && <AddLink />}
      <NavLink
        to='/notifications'
        style={
          location.pathname.includes('notifications')
            ? { border: '1px solid dodgerblue' }
            : null
        }
        className='bell-wrap'
      >
        <Bell active={location.pathname.includes('notifications')} />
      </NavLink>
      <ProfileDropDown user={user} />
    </StyledNavRight>
  )
}

NavRight.propTypes = {
  user: PropTypes.object.isRequired,
}

export default withRouter(NavRight)

const StyledNavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 300px;
  height: 100%;
  @media (max-width: 650px) {
    width: 250px;
  }
  .search-wrap {
    border-radius: 50%;
    &:hover {
      border: 1px solid dodgerblue;
    }
  }
  .bell-wrap {
    // border-radius: 50%;
    // border: 1px solid rgb(191, 197, 201);
    padding: 3px;
    margin-left: 20px;
    // &:hover {
    //   border: 1px solid dodgerblue;
    // }
  }
`
