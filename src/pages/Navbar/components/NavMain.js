import React from 'react'
import styled from 'styled-components'
import NavLeft from './NavLeft'
import NavRight from './NavRight'
import Brand from './Brand'
import Search from '../Search'

import { customLayout } from 'styles'
import PropTypes from 'prop-types'

const NavMain = props => {
  const { search } = props
  return (
    <Nav>
      <NavLeft />
      {search.isSearch ? <Search /> : <Brand />}
      <NavRight {...props} />
    </Nav>
  )
}

NavMain.propTypes = {}

export default NavMain

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
`
