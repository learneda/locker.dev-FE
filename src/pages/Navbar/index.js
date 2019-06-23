import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import NavLeft from './components/NavLeft'
import BrandSVG from 'assets/react-svg/BrandSVG'
import NavRight from './components/NavRight'
import Search from 'containers/Search'
import { customLayout } from 'styles'
import * as searchActions from './store/searchActions'

const Navbar = props => {
  const { search } = props
  return (
    <Sticky>
      <Nav>
        <NavLeft />
        {search.isSearch ? (
          <Search />
        ) : (
          <NavLink activeClassName='locker' to='/locker'>
            <BrandSVG />
          </NavLink>
        )}
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
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
  a {
    display: flex;
    align-items: center;
    position: relative;
    top: 1px;
    height: 100%;
    border-bottom: 3px solid transparent;
    transition: border-bottom 300ms ease;
    &:hover {
      border-bottom: 3px solid dodgerblue;
    }
  }
  .locker {
    border-bottom: 3px solid dodgerblue;
  }
`
