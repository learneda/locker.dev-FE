import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components'
import AddLink from 'containers/AddLink'
import Search from 'containers/Search'
import SearchSVG from 'assets/react-svg/SearchSVG'
import useOnClickOutside from 'use-onclickoutside'
import { useMedia } from 'use-media'

const NavRight = props => {
  const {
    user,
    toggleSearch,
    setSearchOff,
    resetSearchTerm,
    search: { searchTerm, isSearch },
  } = props
  const isLarge = useMedia({ minWidth: 650 })
  const isMobile = useMedia({ maxWidth: 500 })
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
      <ProfileDropDown user={user} />
    </StyledNavRight>
  )
}

NavRight.propTypes = {
  user: PropTypes.object.isRequired,
}

export default NavRight

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
`
