import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import NavLeft from './components/NavLeft'
import NavRight from './components/NavRight'
import Search from 'containers/Search'
import { customLayout } from 'styles'
import * as searchActions from './store/searchActions'

const Navbar = props => {
  const { user, search, location } = props
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(location.pathname.includes('/locker'))
    return () => {
      setActive(false)
    }
  }, [location])

  return (
    <Sticky>
      <Nav>
        <NavLeft />
        <NavRight user={user} {...props} />
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
)(withRouter(Navbar))

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  search: PropTypes.shape({
    isSearch: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
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
