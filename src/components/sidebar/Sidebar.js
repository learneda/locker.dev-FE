import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fetchUser, fetchFollowers, fetchFollowing } from '../../actions'
import ContentLoader from 'react-content-loader'

import styled from 'styled-components'
import { customLayout, customWrapper } from '../mixins'
import Moment from 'react-moment'
import locationSvg from '../../assets/svg/location.svg'
import linkSvg from '../../assets/svg/link-symbol.svg'
import calendarSvg from '../../assets/svg/calendar.svg'
import { StyledSidebar } from './StyledSidebar'

const MyLoader = () => (
  <ContentLoader
    height={451}
    width={266}
    speed={2}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
  >
    <circle cx='133' cy='84' r='50' />
    <rect x='0' y='134' rx='0' ry='0' width='266' height='317' />
  </ContentLoader>
)
class Sidebar extends Component {
  render() {
    if (!this.props.user) {
      return (
        <Wrapper>
          <MyLoader />
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        {this.props.user && (
          <Profile>
            <div className='user'>
              <img src={this.props.user.profilePicture} alt='avatar' />
            </div>
            <div className='user-bio'>
              <h3>{this.props.user.displayName}</h3>
              <div className='profile-stats'>
                <Link to='/home/collections'>
                  <ul>
                    <li>Posts</li>
                    <li>{this.props.collections.length}</li>
                  </ul>
                </Link>

                <Link to='/social/following'>
                  <ul>
                    <li>Following</li>
                    <li>{this.props.following.length}</li>
                  </ul>
                </Link>
                <Link to='/social/followers' className='sidebar-followers'>
                  <ul>
                    <li>Followers</li>
                    <li>{this.props.followers.length}</li>
                  </ul>
                </Link>
              </div>
              <p>
                {this.props.user.bio ? (
                  this.props.user.bio
                ) : (
                  <Link to='/settings'>Add Bio</Link>
                )}
              </p>
              <p>
                <img src={locationSvg} alt='location-icon' />
                {this.props.user.location ? (
                  this.props.user.location
                ) : (
                  <Link to='/settings'>Add location</Link>
                )}
              </p>
              <p>
                <img src={linkSvg} alt='link-icon' />
                {this.props.user.websiteUrl ? (
                  this.props.user.websiteUrl.includes('http') ? (
                    <a
                      href={this.props.user.websiteUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {this.props.user.websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <a
                      href={`https://${this.props.user.websiteUrl}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {this.props.user.websiteUrl}
                    </a>
                  )
                ) : (
                  <Link to='/settings'>Add website URL</Link>
                )}
              </p>
              <p>
                <img src={calendarSvg} alt='calendar-icon' />
                Joined{' '}
                <Moment format='MMMM YYYY'>{this.props.user.createdAt}</Moment>
              </p>
              <div className='edit-profile-link'>
                <Link to='/settings'>Edit Profile</Link>
              </div>
            </div>
          </Profile>
        )}
      </Wrapper>
    )
  }
}

export default Sidebar

const Wrapper = styled.div`
  ${customWrapper('45%')};
  max-width: 300px;

  @media (max-width: 900px) {
    display: none;
  }
`

const Profile = styled.div`
  ${StyledSidebar};
  .user {
    ${customLayout('center', 'center')}
  }
  .user-bio {
    ${customLayout()}
  }
`
