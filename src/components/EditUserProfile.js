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

        <Profile>
          <h2>Yo</h2>
          <FormGroup
            onSubmit={e => this.editProfileHandler(e, this.props.auth.id)}
          >
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Add full name"
              value={this.state.display_name}
              name="display_name"
              required
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Add username"
              value={this.state.username}
              name="username"
              required
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Add bio"
              value={this.state.bio}
              name="bio"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Add location"
              value={this.state.location}
              name="location"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Add website URL"
              value={this.state.website_url}
              name="website_url"
            />
            <Link to="/profile">Cancel</Link>
            <button
              type="submit"
              onClick={() => {
                this.props.alert.success('User settings successfully updated.');
              }}
            >
              Save
            </button>
          </FormGroup>
        </Profile>
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

const Profile = styled.div`
  border-radius: 5px;
  background-color: white;
`;

const FormGroup = styled.form`
  border: 1px solid red;
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
