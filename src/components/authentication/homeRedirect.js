import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const HomeRedirect = Component => ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return <Component />;
      default:
        return <Redirect to="/home" />;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
};

const mapStateToProps = ({ auth }) => ({ auth });

export const composedHomeRedirect = compose(
  connect(mapStateToProps),
  HomeRedirect
);
