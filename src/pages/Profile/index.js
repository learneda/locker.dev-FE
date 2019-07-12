import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Moment from 'react-moment'
import Suggested from 'components/sidebar/Suggested'
import OtherFollowing from 'components/profile/OtherFollowing'
import OtherFollowers from 'components/profile/OtherFollowers'
import ProfileHeader from './components/ProfileHeader'
import ProfileNav from './components/ProfileNav'
import Feed from 'containers/Feed'
import locationSvg from 'assets/svg/location.svg'
import linkSvg from 'assets/svg/link-symbol.svg'
import calendarSvg from 'assets/svg/calendar.svg'
import * as socialActions from 'actions/socialActions'
import * as profileActions from 'pages/Profile/store/profileActions'
import * as homeActions from 'pages/Home/store/homeActions'
import { useDispatch } from 'react-redux'

const Profile = props => {
  const {
    className,
    auth,
    match,
    profile,
    social,
    feed,
    fetchProfileFollowers,
    followAUser,
    unfollowAUser,
    fetchFollowing,
    fetchProfileCollections,
    fetchProfileFollowing,
    fetchProfileDetails,
    resetProfile,
    fetchSuggested,
    fetchFollowers,
    fetchPostCount,
    postCount,
  } = props
  const id = Number(match.params.id)
  const dispatch = useDispatch()

  useEffect(() => {
    // fetching other collections
    fetchProfileCollections(id, feed.offset)
    fetchProfileFollowing(id)
    fetchProfileFollowers(id)
    fetchProfileDetails(id)
    fetchSuggested(auth.id)
    fetchFollowing(auth.id)
    fetchFollowers(auth.id)
    fetchPostCount(id)
    return () => {
      dispatch({ type: 'RESET_POSTS' })
      resetProfile()
    }
  }, [id])

  const isFollowed = () => {
    const followingIds = social.following.map(ele => ele.id)
    return followingIds.includes(profile.other.id)
  }

  const followAUserHandler = async e => {
    e.preventDefault()
    const friend_id = id
    await followAUser({ user_id: auth.id, friend_id })
    await fetchProfileFollowers(friend_id)
  }

  const unfollowAUserHandler = async e => {
    e.preventDefault()
    const friend_id = id
    await unfollowAUser({ user_id: auth.id, friend_id })
    await fetchProfileFollowers(friend_id)
  }

  return (
    <Wrapper>
      {profile.other.id && (
        <>
          <ProfileHeader auth={auth} user={profile.other} />
          <ProfileNav
            auth={auth}
            user={profile.other}
            posts={feed.posts}
            postCount={social.postCount}
            followingCount={profile.following.length}
            followerCount={profile.followers.length}
          />
          <Container>
            <main className='profile-main'>
              <div className='profile-left'>
                {auth.id !== profile.other.id && (
                  <div className='follow-btn-grp'>
                    {isFollowed() ? (
                      <button type='button' onClick={unfollowAUserHandler}>
                        Unfollow
                      </button>
                    ) : (
                      <button type='button' onClick={followAUserHandler}>
                        Follow
                      </button>
                    )}
                  </div>
                )}
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    padding: '10px 0 0px',
                  }}
                >
                  {profile.other.display_name}
                </div>
                <div
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: 'rgb(102,117,127)',
                    padding: '10px 0',
                  }}
                >{`@${profile.other.username}`}</div>
                <p
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    padding: '10px 0',
                  }}
                >
                  {profile.other.bio ? profile.other.bio : 'User has no bio.'}
                </p>
                <p
                  style={{
                    fontSize: '1.6rem',
                    padding: '10px 0',
                  }}
                >
                  <img src={locationSvg} alt='location-icon' />
                  {profile.other.location
                    ? profile.other.location
                    : ' No location specified.'}
                </p>
                <p
                  style={{
                    fontSize: '1.6rem',
                    padding: '10px 0',
                  }}
                >
                  <img src={linkSvg} alt='link-icon' />
                  {profile.other.website_url ? (
                    profile.other.website_url.includes('http') ? (
                      <a
                        href={profile.other.website_url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {profile.other.website_url.replace(/^https?:\/\//, '')}
                      </a>
                    ) : (
                      <a
                        href={`https://${profile.other.website_url}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {profile.other.website_url}
                      </a>
                    )
                  ) : (
                    ' No URL provided'
                  )}
                </p>
                <p
                  style={{
                    fontSize: '1.6rem',
                    padding: '10px 0',
                  }}
                >
                  <img src={calendarSvg} alt='calendar-icon' /> Joined{' '}
                  <Moment format='MMMM YYYY'>{profile.other.created_at}</Moment>
                </p>
              </div>
              <div className='profile-center'>
                <Switch>
                  <Route
                    exact
                    path={[`${match.path}`, `${match.path}/posts`]}
                    render={props => (
                      <Feed
                        {...props}
                        posts={feed.posts}
                        hasmore={feed.hasmore}
                        fetchMoreTagFeed={fetchProfileCollections}
                        offset={feed.offset}
                        tag={id}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`${match.path}/following`}
                    render={props => (
                      <OtherFollowing
                        {...props}
                        userId={auth.id}
                        following={profile.following}
                        userFollowing={social.following}
                        followAUser={followAUser}
                        unfollowAUser={unfollowAUser}
                        fetchFollowing={fetchFollowing}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`${match.path}/followers`}
                    render={props => (
                      <OtherFollowers
                        {...props}
                        userId={auth.id}
                        following={social.following}
                        followers={profile.followers}
                        followAUser={followAUser}
                        unfollowAUser={unfollowAUser}
                        fetchFollowing={fetchFollowing}
                      />
                    )}
                  />
                </Switch>
              </div>
              <div className='profile-right'>
                <StyledSuggested
                  auth={auth}
                  suggested={social.suggested}
                  fetchSuggested={fetchSuggested}
                  fetchFollowing={fetchFollowing}
                  followAUser={followAUser}
                  className={className}
                />
              </div>
            </main>
          </Container>
        </>
      )}
    </Wrapper>
  )
}
const mapStateToProps = ({ auth, profile, social, home }) => {
  return { auth, profile, social, feed: home }
}
export default connect(
  mapStateToProps,
  {
    ...homeActions,
    ...profileActions,
    ...socialActions,
  }
)(withRouter(Profile))

Profile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.any,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  social: PropTypes.object.isRequired,
  feed: PropTypes.object.isRequired,
  fetchProfileFollowers: PropTypes.func.isRequired,
  followAUser: PropTypes.func.isRequired,
  unfollowAUser: PropTypes.func.isRequired,
  fetchFollowing: PropTypes.func.isRequired,
  fetchProfileCollections: PropTypes.func.isRequired,
  fetchProfileFollowing: PropTypes.func.isRequired,
  fetchProfileDetails: PropTypes.func.isRequired,
  resetProfile: PropTypes.func.isRequired,
  fetchSuggested: PropTypes.func.isRequired,
  fetchFollowers: PropTypes.func.isRequired,
}

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  position: relative;
`
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 30px auto;
  .profile-main {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    /* border: 1px solid red; */
    @media (max-width: 1200px) {
      justify-content: flex-start;
    }
    @media (max-width: 860px) {
      justify-content: center;
    }
    .profile-left {
      width: 260px;
      padding-left: 40px;
      padding-top: 20px;
      /* border: 1px solid red; */
      @media (max-width: 860px) {
        display: none;
      }

      img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        margin-bottom: -3px;
      }
      .follow-btn-grp {
        button {
          font-weight: 700;
          border-radius: 5px;
          border: transparent;
          border-radius: 50px;
          background-color: white;
          border: 1px solid dodgerblue;
          color: dodgerblue;
          cursor: pointer;
          transition: 200ms ease-out;
          font-size: 1.3rem;
          letter-spacing: 0.9;
          padding: 8px 15px;
          margin-bottom: 10px;
          &:hover {
            background-color: #e8f4fb;
          }
        }
      }
    }
    .profile-center {
      width: 580px;
      /* border: 1px solid red; */
      @media (max-width: 860px) {
        margin-top: 10px;
      }
      @media (max-width: 570px) {
        width: 100%;
      }
    }
    .profile-right {
      width: 260px;
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
`

const StyledSuggested = styled(Suggested)`
  position: static;
`
