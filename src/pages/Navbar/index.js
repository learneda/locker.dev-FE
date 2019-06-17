import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Sticky } from 'styles/elements'
import NavMain from './components/NavMain'
import NavMobile from './components/NavMobile'

const Navbar = props => {
  let prevScrollY = window.pageYOffset
  window.onscroll = function() {
    let currentScrollY = window.pageYOffset

    if (document.getElementById('navbar')) {
      if (prevScrollY > currentScrollY) {
        document.getElementById('navbar').style.top = '0'
      } else {
        document.getElementById('navbar').style.top = '-50px'
      }
    }
    prevScrollY = currentScrollY
  }

  return (
    <Sticky>
      <NavMain {...props} id='navbar' />
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
