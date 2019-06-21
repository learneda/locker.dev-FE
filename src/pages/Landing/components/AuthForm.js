import React from 'react'
import { authURL, clientUrl } from 'services'
import googleSvg from 'assets/svg/google.svg'
import githubSvg from 'assets/svg/github.svg'
import { createPopup } from 'helpers'
import styled from 'styled-components'

const AuthForm = props => {
  // isSignUp: true if auth should be signup window, otherwise show login.
  const { isSignUp } = props

  return isSignUp ? (
    <Form id='signup-form'>
      <div className='form-oauth-providers'>
        <button
          onClick={e => {
            e.preventDefault()
            createPopup(`${authURL}/google`, clientUrl)
          }}
        >
          <img src={googleSvg} alt='google signup' />
          <p>Sign up with Google</p>
        </button>
      </div>
      <div className='form-oauth-providers'>
        <button
          onClick={e => {
            e.preventDefault()
            createPopup(`${authURL}/github`, clientUrl)
          }}
        >
          <img src={githubSvg} alt='github signup' />
          <p>Sign up with GitHub</p>
        </button>
      </div>
    </Form>
  ) : (
    <Form id='login-form'>
      <div className='form-oauth-providers'>
        <button
          onClick={e => {
            e.preventDefault()
            createPopup(`${authURL}/google`, clientUrl)
          }}
        >
          <img src={googleSvg} alt='google-login' />
          <p>Login with Google</p>
        </button>
      </div>
      <div className='form-oauth-providers'>
        <button
          onClick={e => {
            e.preventDefault()
            createPopup(`${authURL}/github`, clientUrl)
          }}
        >
          <img src={githubSvg} alt='github-login' />
          <p>Login with GitHub</p>
        </button>
      </div>
    </Form>
  )
}

export default AuthForm

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  -webkit-appearance: none;
  padding: 28px 5px 10px 5px;

  .form-oauth-providers {
    width: 100%;
    margin: auto;
    text-align: center;
    padding: 20px;
    padding-top: 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms ease-out;
    margin-bottom: 4px;
  }
  .form-oauth-providers button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 5px;
    background: rgb(226, 226, 226);
  }
  .form-oauth-providers:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
  .form-oauth-providers p {
    text-align: center;
    margin-left: 7px;
    color: #222;
    font-size: 2rem;
  }
  .form-oauth-providers img {
    max-width: 55px;
  }
`
