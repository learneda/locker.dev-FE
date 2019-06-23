import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Moment from 'react-moment'
import styled from 'styled-components'
import * as socialActions from 'actions/socialActions'
import { customLayout } from 'styles'
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
      website_url,
      created_at,
      profile_picture,
    } = this.props.other

    const profileId = Number(this.props.match.params.id)

    return (
      <Wrapper>
        <Profile>
          <div className='user'>
            <img
              src={profile_picture}
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
                  <li>Saved</li>
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
              {website_url ? (
                website_url.includes('http') ? (
                  <a
                    href={website_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {website_url.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <a
                    href={`https://${website_url}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {website_url}
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

const mapStateToProps = ({ auth, social }) => {
  return {
    auth,
    following: social.following,
  }
}

export default connect(
  mapStateToProps,
  { ...socialActions }
)(withRouter(SidebarById))

const Wrapper = styled.div`
  max-width: 300px;
  position: relative;
  @media (max-width: 900px) {
    display: none;
  }
`
const Profile = styled.div`
  margin-top: 47px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;
  position: sticky;
  top: 105px;
  width: 300px;
  @media (max-width: 1200px) {
    margin-top: 45px;
  }

  .user {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 18px 0;
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
      width: 100px;
      object-fit: cover;
    }
  }

  .user-bio {
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 15px 8%;
    margin: 0 auto;
    @media (max-width: 1350px) {
      width: 100%;
    }
    h3 {
      margin: 0 auto;
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    p {
      line-height: 25px;
      margin-bottom: 15px;
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
      display: flex;
      justify-content: center;
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
      margin-bottom: 3.5px;
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
      /* flex-direction: column; */
      flex-wrap: wrap;
    }
    a {
      margin-right: 12px;
      cursor: pointer;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      cursor: pointer;
      transition: 200ms ease-out;
      :not(:last-child) {
        margin-right: 12px;
      }

      &:hover {
        color: #3f65f2;
        transition: 200ms ease-in;
        li:nth-of-type(2) {
          opacity: 1;
        }
      }
      li {
        font-size: 1.6rem;
      }
      li:nth-of-type(2) {
        opacity: 0.7;
        // text-align:center
        transition: 200ms ease-out;
      }
    }
    .sidebar-followers {
      margin-right: 0px;
    }
  }
  .follow-stats-dropdown {
    position: absolute;
    top: 240px;
    left: 0;
    right: 0;
    background: #fff;
    width: 100%;
    overflow: auto;
    transition: 200ms height ease-in-out;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 0 0 5px 5px;
    .caret-up {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 3px;
      top: 10px;
      cursor: pointer;
    }
    a {
      margin: 15px 0;
      &:hover {
        h2 {
          opacity: 1;
          transition: 200ms ease-in;
        }
      }
    }
    .follow {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    h2 {
      font-size: 1.8rem;
      opacity: 0.7;
      transition: 200ms ease-out;
    }
  }
  .user {
    ${customLayout('center', 'center')}
  }
  .user-bio {
    ${customLayout()}
  }
`
