import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../actions';

import styled from 'styled-components';
import { customLayout, customWrapper } from './mixins';
import EditableLabel from 'react-inline-edition';
import Moment from 'react-moment';
import locationSvg from '../assets/svg/location.svg';
import linkSvg from '../assets/svg/link-symbol.svg';
import calendarSvg from '../assets/svg/calendar.svg';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: 'Add bio',
      location: 'Add location',
      website_url: 'Add website URL'
    };
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
            <p>{this.props.auth.bio}</p>
            <p>
              <img src={locationSvg} alt="location-icon" />
              {this.props.auth.location}
            </p>
            <p>
              <img src={linkSvg} alt="link-icon" />
              {this.props.auth.website_url}
            </p>
            <p>
              <img src={calendarSvg} alt="calendar-icon" />
              Joined <Moment format="MMMM YYYY">{this.props.created_at}</Moment>
            </p>
            <button>Edit Profile</button>
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
      img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
    }

    mark {
      background-color: transparent;
      color: #333;
    }

    button {
      margin: 0;
      margin-top: 20px;
      padding: 0;
      border: none;
      background: none;
      font-size: 1.4rem;
      font-weight: 700;
      color: #6d767e;
      cursor: pointer;
      transition: 200ms ease-out;

      &:hover {
        color: #3f65f2;
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
