import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { customWrapper } from 'components/mixins'
import NavLanding from 'components/navigation/NavLanding'
import Body from './Body'
import Auth from 'components/authentication/Auth'
import { authModalToggle, modalLogin, modalSignUp } from './authModalActions'

const Landing = ({ modal, authModalToggle, modalLogin, modalSignUp }) => {
  const { isAuthOpen, isEditOpen } = modal

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden')
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto')
  }

  return (
    <Wrapper>
      <Auth
        modal={modal}
        authModalToggle={authModalToggle}
        modalLogin={modalLogin}
        modalSignUp={modalSignUp}
      />
      <NavLanding
        authModalToggle={authModalToggle}
        modalLogin={modalLogin}
        modalSignUp={modalSignUp}
      />
      <Body authModalToggle={authModalToggle} modalSignUp={modalSignUp} />
    </Wrapper>
  )
}

const mapStateToProps = ({ modal }) => ({ modal })

export default connect(
  mapStateToProps,
  { authModalToggle, modalLogin, modalSignUp }
)(Landing)

const Wrapper = styled.div`
  width: 100%;
`
