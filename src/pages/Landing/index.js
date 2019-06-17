import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Nav, Body, Footer, Auth } from './components'
import * as authModalActions from './authModalActions'

const Landing = props => {
  const {
    modal: { isAuthOpen },
  } = props

  return (
    <Wrapper>
      {isAuthOpen && <Auth {...props} />}
      <Nav {...props} />
      <Body {...props} />
      <Footer />
    </Wrapper>
  )
}
const mapStateToProps = ({ modal }) => ({ modal })

export default connect(
  mapStateToProps,
  { ...authModalActions }
)(Landing)

const Wrapper = styled.div`
  width: 100%;
  background: white;
`
