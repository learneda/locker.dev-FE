import React from 'react'
import PropTypes from 'prop-types'
import ProfileDropDown from './ProfileDropDown'
import styled from 'styled-components'
import AddLink from 'containers/AddLink'
import Search from 'containers/Search'
import SearchSVG from 'assets/react-svg/SearchSVG'
import { useMedia } from 'use-media'

const NavRight = props => {
  const { user } = props
  const isLarge = useMedia({ minWidth: 650 })

  return (
    <StyledNavRight>
      <Search />
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
`
