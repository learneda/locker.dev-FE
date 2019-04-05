import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../actions';

import styled from 'styled-components';
import { customLayout, customWrapper } from './mixins';
import EditableLabel from 'react-inline-edition';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: 'Add bio',
      location: 'Add location',
      website_url: 'Add website URL'
    };

    this._bioFocusOut = this._bioFocusOut.bind(this);
    this._locationFocusOut = this._locationFocusOut.bind(this);
    this._websiteFocusOut = this._websiteFocusOut.bind(this);
  }

  _bioFocusOut(text) {
    this.props.editProfile(this.props.auth.id, { bio: text });
  }

  _locationFocusOut(text) {
    this.props.editProfile(this.props.auth.id, { location: text });
  }

  _websiteFocusOut(text) {
    this.props.editProfile(this.props.auth.id, { website_url: text });
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

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
              <EditableLabel
                text={
                  this.props.auth.bio ? this.props.auth.bio : this.state.bio
                }
                labelClassName="myLabelClass"
                labelPlaceHolder="ADD BIO"
                inputClassName="myInputClass"
                inputWidth="200px"
                inputHeight="25px"
                inputMaxLength={100}
                onFocusOut={this._bioFocusOut}
              />
            </p>

            <p>
              <EditableLabel
                text={
                  this.props.auth.location
                    ? this.props.auth.location
                    : this.state.location
                }
                labelClassName="myLabelClass"
                inputClassName="myInputClass"
                inputWidth="200px"
                inputHeight="25px"
                inputMaxLength={50}
                onFocusOut={this._locationFocusOut}
              />
            </p>

            <p>
              <EditableLabel
                text={
                  this.props.auth.website_url
                    ? this.props.auth.website_url
                    : this.state.website_url
                }
                labelClassName="myLabelClass"
                inputClassName="myInputClass"
                inputWidth="200px"
                inputHeight="25px"
                inputMaxLength={50}
                onFocusOut={this._websiteFocusOut}
              />
            </p>
          </div>
        </Profile>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  ${customWrapper('25%')}

  @media (max-width: 900px) {
    display: none;
  }
`;

const Profile = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  background: #fff;
  position: sticky;
  top: 100px;

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
      margin-bottom: 10px;
      color: #6d767e;
    }

    mark {
      background-color: transparent;
      color: #333;
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
  };
};

export default connect(
  mapStateToProps,
  { editProfile }
)(Sidebar);
