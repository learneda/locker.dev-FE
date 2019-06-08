import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import LandingPage from 'pages/Landing'

const HomeRedirect = Component => ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        // loading
        return null
      // auth false (user not logged in)
      case false:
        return <LandingPage />
      // covered all cases only case left is if auth is True therefore render Home Component
      default:
        return <Component />
    }
  }

  return <>{renderContent()}</>
}

const mapStateToProps = ({ auth }) => ({ auth })

export const composedHomeRedirect = compose(
  connect(mapStateToProps),
  HomeRedirect
)
