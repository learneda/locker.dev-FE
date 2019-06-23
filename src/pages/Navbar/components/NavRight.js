import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components'
import AddLink from 'containers/AddLink'
import Search from 'containers/Search'
import { useMedia } from 'use-media'
import SearchSVG from 'assets/react-svg/SearchSVG'
import useOnClickOutside from 'use-onclickoutside'

const NavRight = props => {
  const {
    user,
    search: { searchTerm, isSearch },
    toggleSearch,
    setSearchOff,
    resetSearchTerm,
  } = props
  const ref = useRef()
  const isSmall = useMedia({ maxWidth: 900 })
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
    if (!isSmall) {
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
  }, [isSmall])
  return (
    <StyledNavRight>
      {isSmall ? (
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
      <AddLink />
      <ProfileDropDown user={user} />
    </StyledNavRight>
  )
}

NavRight.propTypes = {}

export default NavRight

const StyledNavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 330px;
  .search-wrap {
    /* border: 1px solid red; */
    border-radius: 50%;
    &:hover {
      border: 1px solid dodgerblue;
    }
  }
  @media (max-width: 900px) {
    width: 150px;
  }
`
