import React from 'react'
import Body from './Body'
import styled from 'styled-components'
import { customWrapper } from 'components/mixins'
import NavLanding from '../../components/navigation/NavLanding'
import Auth from '../../components/authentication/Auth'

export default ({ authModalToggle, modalLogin, modalSignUp }) => {
  console.log(authModalToggle, modalLogin, modalSignUp)
  return (
    <Wrapper>
      <Auth />
      <NavLanding
        authModalToggle={authModalToggle}
        modalLogin={modalLogin}
        modalSignUp={modalSignUp}
      />
      <Body />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media (max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
  @media (max-width: 600px) {
    ${customWrapper('95%', '0 auto')}
  }
  @media (max-width: 992px) {
    margin-top: 0;
  }
`
