import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getUserProfileDetails,
  getUserFollowers,
  getUserFollowing,
} from '../../actions';
import ContentLoader from 'react-content-loader';

import styled from 'styled-components';
import { customLayout, customWrapper } from '../mixins';
import Moment from 'react-moment';
import locationSvg from '../../assets/svg/location.svg';
import linkSvg from '../../assets/svg/link-symbol.svg';
import calendarSvg from '../../assets/svg/calendar.svg';
import FollowingDropdown from '../utils/FollowingDropdown';
import FollowersDropdown from '../utils/FollowersDropdown';
import { StyledSidebar } from './StyledSidebar';

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={300}
    speed={2}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
  >
    <circle cx='120' cy='73' r='56' />
    <rect x='118' y='425' rx='0' ry='0' width='0' height='0' />
    <rect x='17' y='144' rx='0' ry='0' width='364' height='300' />
  </ContentLoader>
);
class Sidebar extends Component {
  state = {
    followingDropDownHeight: '0px',
    followersDropDownHeight: '0px',
  };
  componentDidMount() {
    this.props.getUserProfileDetails(this.props.auth.id);
    this.props.getUserFollowers(this.props.auth.id);
    this.props.getUserFollowing(this.props.auth.id);
  }
  handleFollowingDropdown = () => {
    this.setState({
      followingDropDownHeight:
        this.state.followingDropDownHeight === '300px' ? '0px' : '300px',
      followersDropDownHeight: '0px',
    });
  };
  handleFollowersDropdown = () => {
    this.setState({
      followersDropDownHeight:
        this.state.followersDropDownHeight === '300px' ? '0px' : '300px',
      followingDropDownHeight: '0px',
    });
  };
  render() {
    if (!this.props.user_details) {
      return <MyLoader />;
    }
    return (
      <Wrapper>
        <Profile>
          <div className='user'>
            <img src={this.props.auth.profile_picture} alt='avatar' />
          </div>
          <div className='user-bio'>
            <h3>{this.props.auth.display_name}</h3>
            <div className='profile-stats'>
              <ul>
                <li>Posts</li>
                <li>{this.props.user_details.post_count}</li>
              </ul>
              <ul onClick={this.handleFollowingDropdown}>
                <li>Following</li>
                <li>{this.props.user_details.following_count}</li>
              </ul>
              <ul onClick={this.handleFollowersDropdown}>
                <li>Followers</li>
                <li>{this.props.user_details.followers_count}</li>
              </ul>
            </div>
            <FollowingDropdown
              following={this.props.following}
              height={this.state.followingDropDownHeight}
              handleFollowingDropdown={this.handleFollowingDropdown}
            />
            <FollowersDropdown
              followers={this.props.followers}
              height={this.state.followersDropDownHeight}
              handleFollowingDropdown={this.handleFollowersDropdown}
            />
            <p>
              {this.props.auth.bio ? (
                this.props.auth.bio
              ) : (
                <Link to='/settings'>Add Bio</Link>
              )}
            </p>
            <p>
              <img src={locationSvg} alt='location-icon' />
              {this.props.auth.location ? (
                this.props.auth.location
              ) : (
                <Link to='/settings'>Add location</Link>
              )}
            </p>
            <p>
              <img src={linkSvg} alt='link-icon' />
              {this.props.auth.website_url ? (
                this.props.auth.website_url.includes('http') ? (
                  <a
                    href={this.props.auth.website_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {this.props.auth.website_url.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <a
                    href={`https://${this.props.auth.website_url}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {this.props.auth.website_url}
                  </a>
                )
              ) : (
                <Link to='/settings'>Add website URL</Link>
              )}
            </p>
            <p>
              <img src={calendarSvg} alt='calendar-icon' />
              Joined <Moment format='MMMM YYYY'>{this.props.created_at}</Moment>
            </p>
            <div className='edit-profile-link'>
              <Link to='/settings'>Edit Profile</Link>
            </div>
          </div>
        </Profile>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth, user_details, follow }) => {
  return {
    auth: auth,
    user_details: user_details,
    followers: follow.userFollowers,
    following: follow.userFollowing,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUserProfileDetails, getUserFollowers, getUserFollowing }
  )(Sidebar)
);

const Wrapper = styled.div`
  ${customWrapper('40%')}
  max-width: 265px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Profile = styled.div`
  ${StyledSidebar}
  .user {
    ${customLayout('center', 'center')}
  }
  .user-bio {
    ${customLayout()}
  }
`;
