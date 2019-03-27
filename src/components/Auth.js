import React, { Component } from 'react';
import './Auth.css';
import svg from './google.svg';
export default class Auth extends Component {
  constructor() {
    super();
    this.state = {
      authView: {
        signUp: true
      }
    };
  }

  render() {
    return (
      <div className="login" id="login">
        <div className="login-content">
          <div
            className="close-modal"
            onClick={() =>
              (document.querySelector('.login').style.display = 'none')
            }
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
          <form
            id="signup-form"
            style={{ display: this.state.authView.signUp ? 'flex' : 'none' }}
          >
            <label htmlFor="name">Name</label>
            <input name="name" required />
            <label htmlFor="email">Email</label>
            <input name="email" required />
            <label htmlFor="email">Password</label>
            <input name="password" type="password" required />
            <label htmlFor="password2">Confirm Password</label>
            <input name="password2" type="password" required />
            <input type="submit" id="submit" value="SIGN UP" />
            <div id="google">
              <a href='https://learned-a.herokuapp.com/auth/google'>
                <img src={svg} alt="" />
                <p>Sign up with Google</p>
              </a>
            </div>
          </form>
          <form
            id="login-form"
            style={{ display: this.state.authView.signUp ? 'none' : 'flex' }}
          >
            <label htmlFor="name">Name</label>
            <input name="name" required />
            <label htmlFor="email">Email</label>
            <input name="email" required />
            <label htmlFor="email">Password</label>
            <input name="password" type="password" required />
            <input type="submit" id="submit" value="LOG IN" />
            <div id="google">
              <a href='https://learned-a.herokuapp.com/auth/google'>
                <img src={svg} alt="" />
                <p>Log in with Google</p>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
