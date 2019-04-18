import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const IndexRedirect = Component => ({ auth }) => {
  console.log('from index redirect 🚀', auth )
  const renderContent = () => {
    switch (auth) {
      case null:
      case false:
        return <Redirect to="/" />;
      default:
        return <Component />;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
};

const mapStateToProps = ({ auth }) => ({ auth });

export const composedIndexRedirect = compose(
  connect(mapStateToProps),
  IndexRedirect
);
