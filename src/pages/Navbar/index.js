import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import styled from 'styled-components'
import NavLeft from './components/NavLeft'
import NavRight from './components/NavRight'
import { customLayout } from 'styles'
import * as searchActions from './store/searchActions'

const Navbar = props => {
  return (
    <Sticky>
      <Nav>
        <NavLeft />
        <NavRight {...props} />
      </Nav>
    </Sticky>
  )
}
const mapStateToProps = ({ user, search }) => ({
  user,
  search,
})

export default connect(
  mapStateToProps,
  { ...searchActions }
)(Navbar)

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
}

const Nav = styled.nav`
  ${customLayout('space-between', 'center')}
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
  .locker {
    border-bottom: 3px solid orangered;
  }
`
