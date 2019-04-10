import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { editProfile, getFollowersAndFollowingCount } from '../actions';

import styled from 'styled-components';
import { customLayout, customWrapper } from './mixins';
import Moment from 'react-moment';
import locationSvg from '../assets/svg/location.svg';
import linkSvg from '../assets/svg/link-symbol.svg';
import calendarSvg from '../assets/svg/calendar.svg';

class Sidebar extends Component {
  componentDidMount() {
    this.props.getFollowersAndFollowingCount();
  }
  render() {
    return (
      <Wrapper>
        <Profile>
          <div className="user">
            <img src={this.props.auth.profile_picture} alt="avatar" />
          </div>
          <div className="user-bio">
            <h3>{this.props.auth.display_name}</h3>
            <div className="profile-stats">
              <ul>
                <li>Posts</li>
                <li>43</li>
              </ul>
              <ul>
                <li>Following</li>
                <li>{this.props.followers.following}</li>
              </ul>
              <ul>
                <li>Followers</li>
                <li>{this.props.followers.followers}</li>
              </ul>
            </div>
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
            <div className="edit-profile-link">
              <Link to="/edit-profile">Edit Profile</Link>
            </div>
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
  border-radius: 5px;
  background: #fff;
  position: sticky;
  top: 100px;

  .user {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
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
    width: 90%;
    margin: auto;
    h3 {
      margin: 0 auto;
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    p {
      line-height: 25px;
      margin-bottom: 10px;
      color: #6d767e;
      // display: flex;
      img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        margin-bottom: -3px;
      }
    }

    mark {
      background-color: transparent;
      color: #333;
    }

    .edit-profile-link {
      margin-top: 20px;
      a {
        font-size: 1.4rem;
        font-weight: 700;
        color: #6d767e;
        transition: 200ms ease-out;

        &:hover {
          color: #3f65f2;
          transition: 200ms ease-in;
        }
      }
    }
  }
  .profile-stats {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1400px) {
      flex-direction: column;
    }
    ul {
      margin-bottom: 20px;
      cursor: pointer;
      transition: 200ms ease-out;
      &:hover {
        color: #3f65f2;
        transition: 200ms ease-in;
        li:nth-of-type(2) {
          opacity: 1;
          // transition: 200ms ease-in;
        }
      }
      li {
        margin-bottom: 5px;
        // transition: 200ms ease-out;
      }
      li:nth-of-type(2) {
        opacity: 0.7;
        transition: 200ms ease-out;
      }
    }
  }
`;

const mapStateToProps = ({ auth, followers }) => {
  return {
    auth: auth,
    followers: followers
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { editProfile, getFollowersAndFollowingCount }
  )(Sidebar)
);
