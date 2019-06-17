import React from 'react'
import PropTypes from 'prop-types'
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components'
import AddLink from '../AddLink'
import Search from '../Search'
import { useMedia } from 'use-media'
import SearchSVG from './SearchSVG'

const NavRight = props => {
  const { user } = props
  const isSmall = useMedia({ maxWidth: 900 })

  return (
    <StyledNavRight>
      {isSmall ? <SearchSVG /> : <Search />}
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
  @media (max-width: 900px) {
    width: 150px;
  }
`
