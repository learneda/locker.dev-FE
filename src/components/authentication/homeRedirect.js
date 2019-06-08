import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import LandingPage from 'pages/Landing'
import { authModalToggle, modalLogin, modalSignUp } from 'actions'

const HomeRedirect = Component => ({
  auth,
  authModalToggle,
  modalLogin,
  modalSignUp,
}) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        // loading
        return null
      // auth false (user not logged in)
      case false:
        return (
          <LandingPage
            modalSignUp={modalSignUp}
            modalLogin={modalLogin}
            authModalToggle={authModalToggle}
          />
        )
      // covered all cases only case left is if auth is True therefore render Home Component
      default:
        return <Component />
    }
  }

  return <>{renderContent()}</>
}

const mapStateToProps = ({ auth }) => ({ auth })

export const composedHomeRedirect = compose(
  connect(
    mapStateToProps,
    { authModalToggle, modalLogin, modalSignUp }
  ),
  HomeRedirect
)
