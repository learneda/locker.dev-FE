import React, { Component } from 'react';
import '../../styles/Auth.css';
import googleSvg from '../../assets/svg/google.svg';
import githubSvg from '../../assets/svg/github.svg';
import { authURL } from '../../services/authURL';
import { connect } from 'react-redux';
import { modalState, modalLogin, modalSignUp } from '../../actions/index';
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      authFormData: {
        email: '',
        password: '',
        password2: ''
      }
      // modalOpen: false
    };
  }
  onSubmit = e => {
    console.log(e);
  };
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    let authForm = '';

    if (this.props.signUp) {
      authForm = (
        // Sign up form
        <form id="signup-form" onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input name="name" required />
          <label htmlFor="email">Email</label>
          <input name="email" required onChange={this.onChange} />
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={this.onChange}
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            name="password2"
            type="password"
            required
            onChange={this.onChange}
          />
          <input type="submit" id="submit" value="SIGN UP" />
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
          <label htmlFor="email">Email</label>
          <input name="email" required />
          <label htmlFor="email">Password</label>
          <input name="password" type="password" required />
          <input type="submit" id="submit" value="LOG IN" />
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
        style={{ display: this.props.modalOpen ? 'flex' : 'none' }}
        onClick={e => e.target.className === 'login' ? this.props.modalState(): null}
      >
        <div className="login-content">
          <div
            className="close-modal"
            onClick={() => {
              this.props.modalState();
            }}
          >
            &times;
          </div>
          <span
            className={this.props.signUp ? null : 'not-current-view'}
            id="sign-up"
            onClick={this.props.modalSignUp}
          >
            Sign up
          </span>
          <span
            className={this.props.signUp ? 'not-current-view' : null}
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
const mapStateToProps = state => {
  console.log('auth component state', state.modalState.modalOpen);
  return {
    modalOpen: state.modalState.modalOpen,
    signUp: state.modalState.signUp
  };
};
export default connect(
  mapStateToProps,
  { modalState, modalSignUp, modalLogin }
)(Auth);
