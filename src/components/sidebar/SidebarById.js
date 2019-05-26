import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Moment from 'react-moment'
import styled from 'styled-components'
import { StyledSidebar } from './StyledSidebar'
import { fetchUser } from 'actions'
import * as socialActions from 'actions/socialActions'
import { customLayout, customWrapper } from '../mixins'
import locationSvg from 'assets/svg/location.svg'
import linkSvg from 'assets/svg/link-symbol.svg'
import calendarSvg from 'assets/svg/calendar.svg'
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={300}
    speed={2}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
    style={{ width: '100%', maxWidth: '350px' }}
  >
    <circle cx='148' cy='73' r='56' />
    <rect x='118' y='425' rx='0' ry='0' width='0' height='0' />
    <rect x='17' y='144' rx='0' ry='0' width='364' height='300' />
  </ContentLoader>
)

class SidebarById extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
    }
  }
  componentDidMount() {
    console.log(this.props.follow)
  }

  followAUserHandler = async e => {
    e.preventDefault()
    const friend_id = Number(this.props.match.params.id)
    await this.props.followAUser({ user_id: this.props.auth.id, friend_id })
    await this.props.fetchProfileFollowers(this.props.match.params.id)
  }

  unfollowAUserHandler = async e => {
    e.preventDefault()
    const friend_id = this.props.match.params.id
    await this.props.unfollowAUser({ user_id: this.props.auth.id, friend_id })
    await this.props.fetchProfileFollowers(this.props.match.params.id)
  }

  imageLoaded = async () => {
    this.setState({
      imageLoaded: true,
    })
  }

  render() {
    if (!this.props.other) {
      return <MyLoader />
    }
    const {
      username,
      bio,
      location,
      websiteUrl,
      created_at,
      profilePicture,
    } = this.props.other

    const profileId = Number(this.props.match.params.id)

    return (
      <Wrapper>
        <Profile>
          <div className='user'>
            <img
              src={profilePicture}
              style={
                this.state.imageLoaded
                  ? { opacity: '1', visibility: 'visible' }
                  : { visibility: 'hidden', opacity: '0' }
              }
              onLoad={() => this.setState({ imageLoaded: true })}
              alt='avatar'
            />
            {/* <ImageLoading /> */}
          </div>
          <div className='user-bio'>
            <h3>{username}</h3>
            <div className='follow-btn-grp'>
              {this.props.follow ? (
                <button type='button' onClick={this.unfollowAUserHandler}>
                  Unfollow
                </button>
              ) : (
                <button type='button' onClick={this.followAUserHandler}>
                  Follow
                </button>
              )}
            </div>

            <div className='profile-stats'>
              <Link to={`/profile/${profileId}`}>
                <ul>
                  <li>Posts</li>
                  <li>{this.props.collectionsCount}</li>
                </ul>
              </Link>
              <Link to={`/profile/${profileId}/following`}>
                <ul>
                  <li>Following</li>
                  <li>{this.props.followingCount}</li>
                </ul>
              </Link>
              <Link to={`/profile/${profileId}/followers`}>
                <ul>
                  <li>Followers</li>
                  <li>{this.props.followersCount}</li>
                </ul>
              </Link>
            </div>

            <p>{bio ? bio : 'User has no bio.'}</p>
            <p>
              <img src={locationSvg} alt='location-icon' />
              {location ? location : 'No location specified.'}
            </p>
            <p>
              <img src={linkSvg} alt='link-icon' />
              {websiteUrl ? (
                websiteUrl.includes('http') ? (
                  <a
                    href={websiteUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <a
                    href={`https://${websiteUrl}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {this.props.user.websiteUrl}
                  </a>
                )
              ) : (
                'No URL provided'
              )}
            </p>
            <p>
              <img src={calendarSvg} alt='calendar-icon' />
              Joined <Moment format='MMMM YYYY'>{created_at}</Moment>
            </p>
          </div>
        </Profile>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ auth, user, social }) => {
  return {
    auth,
    user,
    following: social.following,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchUser,
    ...socialActions,
  }
)(withRouter(SidebarById))

const Wrapper = styled.div`
  ${customWrapper('40%')}
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
