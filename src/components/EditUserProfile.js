import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { editProfile } from '../actions';
import { withAlert } from 'react-alert';

import styled from 'styled-components';
import { customLayout, customWrapper } from './mixins';
import Moment from 'react-moment';
import locationSvg from '../assets/svg/location.svg';
import linkSvg from '../assets/svg/link-symbol.svg';
import calendarSvg from '../assets/svg/calendar.svg';

class EditUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display_name: this.props.auth.display_name,
      username: this.props.auth.username,
      bio: this.props.auth.bio,
      location: this.props.auth.location,
      website_url: this.props.auth.website_url
    };
  }

  editProfileHandler = (e, id) => {
    e.preventDefault();
    const { display_name, username, bio, location, website_url } = this.state;
    this.props.editProfile(id, { bio, location, website_url });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Wrapper>
        <h2>User Settings</h2>

        <FormGroup
          onSubmit={e => this.editProfileHandler(e, this.props.auth.id)}
        >
          <div className="form-wrapper">
            <div className="row">
              <div className="col-2">
                <label>
                  Name
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    placeholder="Add full name"
                    value={this.state.display_name}
                    name="display_name"
                    required
                  />
                </label>

                <label>
                  Username
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    placeholder="Add username"
                    value={this.state.username}
                    name="username"
                    required
                  />
                </label>

                <label>
                  Bio
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    placeholder="Add bio"
                    value={this.state.bio}
                    name="bio"
                  />
                </label>
              </div>

              <div className="col-2">
                <label>
                  Location
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    placeholder="Add location"
                    value={this.state.location}
                    name="location"
                  />
                </label>

                <label>
                  Website URL
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    placeholder="Add website URL"
                    value={this.state.website_url}
                    name="website_url"
                  />
                </label>
              </div>
            </div>

            <div className="btn-group">
              <Link to="/profile">Cancel</Link>
              <button
                type="submit"
                onClick={() => {
                  this.props.alert.success(
                    'User settings successfully updated.'
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        </FormGroup>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`;

const FormGroup = styled.form`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;
  ${customWrapper('80%', '0 auto')}
  padding: 20px;

  .form-wrapper {
    border: 1px solid red;
    padding: 10px;
    ${customLayout()}
    ${customWrapper('80%', '0 auto')}
    flex-direction: column;

    .row {
      border: 2px solid green;
      padding: 10px;
      ${customLayout('space-between')}

      .col-2 {
        width: 50%;
        padding: 10px;
        ${customLayout()}
        flex-wrap: wrap;
        border: 1px solid blue;

        label {
          width: 100%;
          padding: 20px 0;
          color: gray;

          input {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.33);
            margin-top: 10px;
            border-radius: 5px;
            padding: 10px;
            font-size: 2rem;
            color: #333;

            &:focus {
              outline: none;
              border: 1.5px solid #3e66f2;
            }
          }
        }
      }
    }
  }
`;

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
  };
};

const Alert = withAlert()(EditUserProfile);

export default connect(
  mapStateToProps,
  { editProfile }
)(Alert);
