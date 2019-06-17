import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import NavMain from './components/NavMain'
import NavMobile from './components/NavMobile'
import * as searchActions from './store/searchActions'

const Navbar = props => {
  return (
    <Sticky>
      <NavMain {...props} id='navbar' />
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
