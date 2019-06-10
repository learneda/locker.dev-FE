import React from 'react'
import { connect } from 'react-redux'
import AuthForm from './AuthForm'
import deleteIcon from 'assets/svg/delete-icon.svg'
import styled from 'styled-components'
import { StyledAuth } from './StyledAuth'

const Auth = props => {
  const { authModalToggle, modalSignUp, modalLogin, modal } = props
  const { isAuthOpen, isSignUp } = modal

  return (
    <Login
      className='login'
      id='login'
      style={{ display: isAuthOpen ? 'flex' : 'none' }}
      onClick={e => (e.target.className === 'login' ? authModalToggle() : null)}
    >
      <div className='login-content'>
        <div
          className='close-modal'
          onClick={() => {
            authModalToggle()
          }}
        >
          <img src={deleteIcon} alt='' />
        </div>
        <span
          className={isSignUp ? null : 'not-current-view'}
          id='sign-up'
          onClick={modalSignUp}
        >
          Sign up
        </span>
        <span
          className={isSignUp ? 'not-current-view' : null}
          id='log-in'
          onClick={modalLogin}
        >
          Login
        </span>
        <AuthForm isSignUp={isSignUp} />
      </div>
    </Login>
  )
}

export default Auth

const Login = styled.div`
  ${StyledAuth}
`
