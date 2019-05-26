import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import { customWrapper } from 'components/mixins'
import SidebarById from 'components/sidebar/SidebarById'
import ProfileById from 'components/profile'
import UserFollowing from 'components/profile/UserFollowing'
import UserFollowers from 'components/profile/UserFollowers'
import * as profileActions from './profileActions'
const UserProfile = props => {
  const {
    match,
    collections,
    following,
    followers,
    profile,
    social,
    fetchProfileCollections,
    fetchProfileFollowing,
    fetchProfileFollowers,
    fetchProfileDetails,
  } = props
  const { id } = match.params

  useEffect(() => {
    // fetching other collections
    fetchProfileCollections(id)
    fetchProfileFollowing(id)
    fetchProfileFollowers(id)
    fetchProfileDetails(id)
  }, [])

  return (
    <Grommet theme={theme}>
      <Container>
        <SidebarById
          collectionsCount={profile.collections.length}
          followingCount={profile.following.length}
          followersCount={profile.followers.length}
          other={profile.other}
          myFollowing={social.following}
          follow={social.following
            .map(profile => profile.id)
            .includes(Number(id))}
          fetchProfileFollowers={fetchProfileFollowers}
        />
        <Wrapper>
          <div className='tabs'>
            <NavLink
              exact
              to={`${match.url}/collections`}
              className={
                props.location.pathname === `/profile/${id}` ? 'active' : null
              }
            >
              Collections
            </NavLink>
            <NavLink to={`${match.url}/following`}>Following</NavLink>
            <NavLink to={`${match.url}/followers`}>Followers</NavLink>
          </div>

          <TabWrapper>
            <Switch>
              <Route
                exact
                path={[`${match.path}`, `${match.path}/collections`]}
                render={props => (
                  <ProfileById {...props} collections={profile.collections} />
                )}
              />
              <Route
                exact
                path={`${match.path}/following`}
                render={props => (
                  <UserFollowing
                    {...props}
                    profileFollowing={profile.following}
                    myFollowing={social.following}
                  />
                )}
              />
              <Route
                exact
                path={`${match.path}/followers`}
                render={props => (
                  <UserFollowers
                    {...props}
                    profileFollowers={profile.followers}
                    myFollowers={social.followers}
                  />
                )}
              />
            </Switch>
          </TabWrapper>
        </Wrapper>
      </Container>
    </Grommet>
  )
}
const mapStateToProps = ({ profile, social }) => {
  return { profile, social }
}
export default connect(
  mapStateToProps,
  {
    ...profileActions,
  }
)(withRouter(UserProfile))

const theme = {
  tab: {
    color: 'dark-1',
    active: {
      weight: 'bold',
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: {
        light: null,
      },
      active: {
        color: {
          light: 'dark-1',
        },
      },
      hover: {
        color: {
          light: null,
        },
      },
      margin: {
        bottom: '30px',
      },
    },
  },
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
  display: flex;
  @media (max-width: 1100px) {
    width: 90%;
  }
  .tabs {
    position: fixed;
    top: 0;
    z-index: 2;
    align-items: flex-end;
    height: 145px;
    display: flex;
    background: rgb(230, 233, 243);
    width: 100%;
    padding-bottom: 5px;

    a {
      margin-right: 10px;
      margin-right: 2rem;
      margin-bottom: 9px;
      margin-left: 12px;
    }
    .active {
      border-bottom: 3px solid #4064f2;
      font-weight: 900;
      color: #4064f2;
    }
  }
`

const Wrapper = styled.div`
  ${customWrapper('75%')}
  padding-left: 2%;
  @media (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: 40px;
  margin-left: 12px;
  @media (max-width: 900px) {
    margin-left: 0;
  }
`
