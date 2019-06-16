import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useMedia } from 'use-media'
import { Sticky } from 'styles/elements'
import NavMain from './components/NavMain'
import NavMobile from './components/NavMobile'

const Navbar = props => {
  const isMobile = useMedia({ maxWidth: 760 })
  return (
    <Sticky>
      {isMobile ? <NavMobile {...props} /> : <NavMain {...props} />}
    </Sticky>
  )
}
const mapStateToProps = ({ auth, user }) => ({
  auth,
  user,
})

export default connect(
  mapStateToProps,
  null
)(Navbar)
