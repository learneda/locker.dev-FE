import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Nav, Body, Footer, Auth } from './components'
import * as authModalActions from './store/authModalActions'
import { CSSTransition } from 'react-transition-group'
import { transitionClasses } from 'helpers/transitionClasses'

const Landing = props => {
  const {
    modal: { isAuthOpen },
  } = props

  return (
    <Wrapper>
      <CSSTransition
        timeout={300}
        classNames='auth'
        in={isAuthOpen}
        unmountOnExit
      >
        <Auth {...props} />
      </CSSTransition>
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
  ${transitionClasses('auth', 300)}
  width: 100%;
  background: white;
`
