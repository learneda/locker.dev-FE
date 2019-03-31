import React, { Component } from 'react';
import '../styles/Auth.css';
import googleSvg from '../assets/svg/google.svg';
import githubSvg from '../assets/svg/github.svg';
import { authURL } from '../services/authURL';
import { connect } from 'react-redux';
import { modalState } from '../actions/index';
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      authView: {
        signUp: true
      },
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

    if (this.state.authView.signUp === true) {
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
            // onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
            onClick={() => {
              this.props.modalState();
            }}
          >
            &times;
          </div>
          <span
            className={this.state.authView.signUp ? null : 'not-current-view'}
            id="sign-up"
            onClick={() =>
              this.setState({
                authView: { signUp: true }
              })
            }
          >
            Sign up
          </span>
          <span
            className={this.state.authView.signUp ? 'not-current-view' : null}
            id="log-in"
            onClick={() =>
              this.setState({
                authView: { signUp: false }
              })
            }
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
    modalOpen: state.modalState.modalOpen
  };
};
export default connect(
  mapStateToProps,
  { modalState }
)(Auth);
