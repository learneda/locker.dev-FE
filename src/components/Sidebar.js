import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { customLayout, customWrapper } from './mixins';

class Sidebar extends Component {
  render() {
    return (
      <Wrapper>
        <Profile>
          <div className="user">
            <img src={this.props.auth.profile_picture} alt="avatar" />
          </div>
          <div className="user-bio">
            <h3>{this.props.auth.display_name}</h3>
            <p>
              I am a Full-Stack Web Developer student at Lambda School. I'm
              learning JavaScript, Python, and C.
            </p>
            <button>Edit bio</button>
          </div>
        </Profile>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  ${customWrapper('25%')}

  @media (max-width: 960px) {
    display: none;
  }
`;

const Profile = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  background: #fff;

  .user {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 20px 0;
    ${customLayout('center', 'center')}
    background-color: #4064f2;
    position: relative;
    height: 80px;
    margin-bottom: 50px;

    img {
      position: absolute;
      top: 30px;
      border: 3px solid #fff;
      border-radius: 50%;
      height: auto;
      width: 100px;
    }
  }

  .user-bio {
    ${customLayout()}
    flex-direction: column;
    flex-wrap: wrap;
    padding: 15px 6%;

    h3 {
      margin: 0 auto;
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    p {
      line-height: 25px;
      margin-bottom: 15px;
      color: #6d767e;
    }

    button {
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      font-size: 1.4rem;
      font-weight: 700;
      cursor: pointer;
      opacity: 0.8;
      transition: 200ms ease-out;

      &:hover {
        opacity: 1;
        transition: 200ms ease-in;
      }
    }
  }
`;

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
    // posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  null
)(Sidebar);
