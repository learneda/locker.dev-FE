import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import styled from 'styled-components'
import NavLeft from './components/NavLeft'
import NavRight from './components/NavRight'
import Brand from './components/Brand'
import Search from './Search'
import { customLayout, hoverBg } from 'components/mixins'

import * as searchActions from './store/searchActions'

const Navbar = props => {
  const { search } = props
  return (
    <Sticky>
      <Nav>
        <NavLeft />
        {search.isSearch ? <Search /> : <Brand />}
        <NavRight {...props} />
      </Nav>
    </Sticky>
  )
}
const mapStateToProps = ({ auth, user, search }) => ({
  auth,
  user,
  search,
})

export default connect(
  mapStateToProps,
  { ...searchActions }
)(Navbar)

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
`
