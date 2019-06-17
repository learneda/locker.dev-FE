import React from 'react'
import styled from 'styled-components'
import NavLeft from './NavLeft'
import NavRight from './NavRight'
import Brand from './Brand'

import { customLayout, hoverBg } from 'components/mixins'
import PropTypes from 'prop-types'

const NavMain = props => {
  const { user } = props
  return (
    <Nav>
      <NavLeft />
      <Brand />
      <NavRight user={user} />
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
