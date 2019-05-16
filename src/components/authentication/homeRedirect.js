import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

const HomeRedirect = Component => ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return <Component />
      case false:
        return <Component />
      default:
        return <Redirect to='/home' />
    }
  }

  return <>{renderContent()}</>
}

const mapStateToProps = ({ auth }) => ({ auth })

export const composedHomeRedirect = compose(
  connect(mapStateToProps),
  HomeRedirect
)
