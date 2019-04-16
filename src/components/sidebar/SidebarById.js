import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';

import {
  getUserProfileDetails,
  followAUser,
  unfollowAUser,
  getFollowing
} from '../../actions';
import { customLayout, customWrapper } from '../mixins';
import locationSvg from '../../assets/svg/location.svg';
import linkSvg from '../../assets/svg/link-symbol.svg';
import calendarSvg from '../../assets/svg/calendar.svg';

class SidebarById extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getUserProfileDetails(id);
    this.props.getFollowing(id);
  }

  followAUserHandler = async e => {
    e.preventDefault();
    const friend_id = this.props.match.params.id;
    await this.props
      .followAUser({ user_id: this.props.auth.id, friend_id })
      .then(() => this.props.getUserProfileDetails(friend_id));
  };

  unfollowAUserHandler = async e => {
    e.preventDefault();
    const friend_id = this.props.match.params.id;
    await this.props
      .unfollowAUser({ user_id: this.props.auth.id, friend_id })
      .then(() => this.props.getUserProfileDetails(friend_id));
  };

  render() {
    if (!this.props.user_details) {
      return <div>LOADING LOADING...</div>;
    }
    const {
      profile_picture,
      username,
      post_count,
      following_count,
      followers_count,
      bio,
      location,
      website_url,
      created_at
    } = this.props.user_details;
    return (
      <Wrapper>
        <Profile>
          <div className="user">
            <img src={profile_picture} alt="avatar" />
          </div>
          <div className="user-bio">
            <h3>{username}</h3>
            <div className="follow-btn-grp">
              {this.props.follow ? (
                <button type="button" onClick={this.unfollowAUserHandler}>
                  Unfollow
                </button>
              ) : (
                <button type="button" onClick={this.followAUserHandler}>
                  Follow
                </button>
              )}
            </div>

            <div className="profile-stats">
              <ul>
                <li>Posts</li>
                <li>{post_count}</li>
              </ul>
              <ul>
                <li>Following</li>
                <li>{following_count}</li>
              </ul>
              <ul>
                <li>Followers</li>
                <li>{followers_count}</li>
              </ul>
            </div>
            <p>{bio ? bio : 'Add bio'}</p>
            <p>
              <img src={locationSvg} alt="location-icon" />
              {location ? location : 'Add location'}
            </p>
            <p>
              <img src={linkSvg} alt="link-icon" />
              {website_url ? website_url : 'Add website URL'}
            </p>
            <p>
              <img src={calendarSvg} alt="calendar-icon" />
              Joined <Moment format="MMMM YYYY">{created_at}</Moment>
            </p>
          </div>
        </Profile>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  ${customWrapper('25%')}
  max-width: 300px;
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
      height: 100px;
      object-fit: cover;
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
    @media (max-width: 1350px) {
      width: 100%;
    }
    h3 {
      margin: 0 auto;
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    p {
      line-height: 25px;
      margin-bottom: 15px;
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

    .follow-btn-grp {
      ${customLayout('center')}
      width: 100%;
      margin-bottom: 20px;
      button {
        padding: 5px 10px;
        font-weight: 700;
        border: transparent;
        border-radius: 5px;
        background-color: #3f65f2;
        color: white;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.4rem;
      }
    }

    .edit-profile-link {
      margin-top: 20px;
      margin-bottom: 10px;
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
      flex-wrap: wrap;
    }
    ul {
      margin-bottom: 15px;
      cursor: pointer;
      transition: 200ms ease-out;
      :not(:last-child) {
        margin-right: 15px;
      }
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

const mapStateToProps = ({ user_details, auth, follow }) => {
  return {
    user_details,
    auth,
    follow
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUserProfileDetails, followAUser, unfollowAUser, getFollowing }
  )(SidebarById)
);
