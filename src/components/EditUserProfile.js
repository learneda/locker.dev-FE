import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../actions';

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
      bio: 'Add bio',
      location: 'Add location',
      website_url: 'Add website URL',
      show: false
    };
  }

  editProfileHandler = (e, id) => {
    e.preventDefault();
    const { bio, location, website_url } = this.state;
    this.props.editProfile(id, { bio, location, website_url });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Wrapper>
        <h2>User Settings</h2>

        <Profile>
          <h2>Yo</h2>
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
  border: 1px solid red;
`;

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
  };
};

export default connect(
  mapStateToProps,
  { editProfile }
)(EditUserProfile);
