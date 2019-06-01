import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { customWrapper } from 'components/mixins'
import Sidebar from 'components/sidebar/Sidebar'
import SidebarById from 'components/sidebar/SidebarById'
import OtherCollections from 'components/profile/OtherCollections'
import OtherFollowing from 'components/profile/OtherFollowing'
import OtherFollowers from 'components/profile/OtherFollowers'
import * as profileActions from './profileActions'
import { createCollection, fetchCollections } from 'actions'
import {
  followAUser,
  unfollowAUser,
  fetchFollowing,
} from 'actions/socialActions'
const ProfilePage = props => {
  const {
    auth,
    user,
    match,
    profile,
    social,
    collections,
    fetchProfileCollections,
    fetchProfileFollowing,
    fetchProfileFollowers,
    fetchProfileDetails,
    resetProfile,
    createCollection,
    fetchCollections,
    followAUser,
    unfollowAUser,
    fetchFollowing,
  } = props
  const id = Number(match.params.id)

  useEffect(() => {
    // fetching other collections
    fetchCollections()
    fetchProfileCollections(id)
    fetchProfileFollowing(id)
    fetchProfileFollowers(id)
    fetchProfileDetails(id)

    return () => {
      resetProfile()
    }
  }, [id])

  return (
    <Container>
      {auth.id === id ? (
        <Sidebar
          user={user}
          collections={collections}
          followers={social.followers}
          following={social.following}
        />
      ) : (
        <SidebarById
          collectionsCount={profile.collections.length}
          followingCount={profile.following.length}
          followersCount={profile.followers.length}
          other={profile.other}
          myFollowing={social.following}
          follow={social.following.map(ele => ele.id).includes(id)}
          fetchProfileFollowers={fetchProfileFollowers}
        />
      )}
      <Wrapper>
        <Tabs>
          <Tab>
            <NavLink
              exact
              to={`${match.url}/saved`}
              className={
                props.location.pathname === `/profile/${id}` ? 'active' : null
              }
            >
              Saved
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/following`}>Following</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/followers`}>Followers</NavLink>
          </Tab>
        </Tabs>
        <TabWrapper>
          <Switch>
            <Route
              exact
              path={[`${match.path}`, `${match.path}/saved`]}
              render={props => (
                <OtherCollections
                  {...props}
                  createCollection={createCollection}
                  fetchProfileCollections={fetchProfileCollections}
                  collections={profile.collections}
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
        </TabWrapper>
      </Wrapper>
    </Container>
  )
}
const mapStateToProps = ({ auth, user, profile, social, collections }) => {
  return { auth, user, profile, social, collections }
}
export default connect(
  mapStateToProps,
  {
    ...profileActions,
    fetchCollections,
    createCollection,
    followAUser,
    unfollowAUser,
    fetchFollowing,
  }
)(withRouter(ProfilePage))

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
  display: flex;
  @media (max-width: 1100px) {
    width: 90%;
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

const Tabs = styled.ul`
  display: flex;
  align-items: flex-end;
  position: sticky;
  background: rgb(230, 233, 243);
  top: 59px;
  font-size: 2rem;
  height: 100px;
  z-index: 1;
  width: 100%;
  padding-bottom: 25px;
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
  @media (max-width: 900px) {
    top: 59px;
    height: 80px;
  }
  @media (max-width: 760px) {
    top: 50px;
    height: 80px;
  }
`

const TabWrapper = styled.div`
  margin-bottom: 40px;
  padding: 0 5px;
`

const Tab = styled.li`
  margin-right: 2rem;
  font-size: 2rem;
  margin-left: 10px;

  a {
    transition: 100ms ease-out;
    &:hover {
      color: #4064f2;
      transition: 100ms ease-in;
    }
  }
`
