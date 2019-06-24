import React, { useRef } from 'react'
import AuthForm from './AuthForm'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

const Auth = props => {
  const { authModalClose, modalSignUp, modalLogin, modal } = props
  const { isAuthOpen, isSignUp } = modal
  const ref = useRef(null)
  useOnClickOutside(ref, authModalClose)
  useLockBodyScroll()
  return (
    <AuthModalContainer
      className='login'
      id='login'
      style={{ display: 'flex' }}
    >
      <div className='login-content' ref={ref}>
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
    </AuthModalContainer>
  )
}

export default Auth

const AuthModalContainer = styled.div`
  position: fixed;
  overflow: hidden;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
  /* display: none; */
  justify-content: center;
  align-items: flex-start;
  /* animation: 400ms fadeIn; */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .login-content {
    position: relative;
    color: #fff;
    background: #fff;
    border-radius: 7px;
    transition: 400ms ease-in-out;
    margin-top: 8%;
  }

  .login-content span {
    padding: 20px;
    width: 187px;
    text-align: center;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    opacity: 0.9;
    color: #222;
    cursor: pointer;
    font-weight: 600;
    display: inline-block;
  }

  .not-current-view {
    background: rgb(226, 226, 226);
    border: 1px solid #999;
  }

  #sign-up {
    border-top-left-radius: 7px;
  }
  #log-in {
    border-top-right-radius: 7px;
  }
`
