import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { Nav, Body, Footer, Auth } from './components'
import { transitionClasses } from 'helpers/transitionClasses'
import * as authModalActions from './store/authModalActions'

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

Landing.propTypes = {
  modal: PropTypes.shape({ isAuthOpen: PropTypes.bool.isRequired }).isRequired,
}
const Wrapper = styled.div`
  ${transitionClasses('auth', 300)}
  width: 100%;
  background: white;
`
