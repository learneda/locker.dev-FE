import React, { Component } from 'react';
import '../../styles/Auth.css';
import googleSvg from '../../assets/svg/google.svg';
import githubSvg from '../../assets/svg/github.svg';
import { authURL } from '../../services/authURL';
import { connect } from 'react-redux';
import { authModalToggle, modalSignUp, modalLogin } from '../../actions/index';
import deleteIcon from '../../assets/svg/delete-icon.svg';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      authFormData: {
        email: '',
        password: '',
        password2: '',
      },
    };
  }

  render() {
    const { authModalToggle, modal } = this.props;
    const { isAuthOpen, isSignUp } = modal;
    let authForm = '';
    if (isSignUp) {
      authForm = (
        // Sign up form
        <form id="signup-form" onSubmit={this.onSubmit}>
          <div className="form-oauth-providers">
            <a href={`${authURL}google`}>
              <img src={googleSvg} alt="" />
              <p>Sign up with Google</p>
            </a>
          </div>
          <div className="form-oauth-providers">
            <a href={`${authURL}github`}>
              <img src={githubSvg} alt="" />
              <p>Sign up with GitHub</p>
            </a>
          </div>
        </form>
      );
    } else {
      authForm = (
        // Log in form
        <form id="login-form" onSubmit={this.onSubmit}>
          <div className="form-oauth-providers">
            <a href={`${authURL}google`}>
              <img src={googleSvg} alt="" />
              <p>Login with Google</p>
            </a>
          </div>
          <div className="form-oauth-providers">
            <a href={`${authURL}github`}>
              <img src={githubSvg} alt="" />
              <p>Login with GitHub</p>
            </a>
          </div>
        </form>
      );
    }
    return (
      <div
        className="login"
        id="login"
        style={{ display: isAuthOpen ? 'flex' : 'none' }}
        onClick={e =>
          e.target.className === 'login' ? authModalToggle() : null
        }
      >
        <div className="login-content">
          <div
            className="close-modal"
            onClick={() => {
              authModalToggle();
            }}
          >
            <img src={deleteIcon} alt="" />
          </div>
          <span
            className={isSignUp ? null : 'not-current-view'}
            id="sign-up"
            onClick={this.props.modalSignUp}
          >
            Sign up
          </span>
          <span
            className={isSignUp ? 'not-current-view' : null}
            id="log-in"
            onClick={this.props.modalLogin}
          >
            Login
          </span>
          {authForm}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ modal }) => ({ modal });

export default connect(
  mapStateToProps,
  { authModalToggle, modalSignUp, modalLogin }
)(Auth);
