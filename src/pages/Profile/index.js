import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { customWrapper } from 'components/mixins'
import SidebarById from 'components/sidebar/SidebarById'
import ProfileById from 'components/profile'
import UserFollowing from 'components/profile/UserFollowing'
import UserFollowers from 'components/profile/UserFollowers'
import * as profileActions from './profileActions'
import { createCollection } from 'actions'
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
    resetProfile,
    createCollection,
  } = props
  const { id } = match.params

  useEffect(() => {
    // fetching other collections
    fetchProfileCollections(id)
    fetchProfileFollowing(id)
    fetchProfileFollowers(id)
    fetchProfileDetails(id)

    return () => {
      resetProfile()
    }
  }, [])

  return (
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
        <Tabs>
          <Tab>
            <NavLink
              exact
              to={`${match.url}/collections`}
              className={
                props.location.pathname === `/profile/${id}` ? 'active' : null
              }
            >
              Collections
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
              path={[`${match.path}`, `${match.path}/collections`]}
              render={props => (
                <ProfileById
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
  )
}
const mapStateToProps = ({ profile, social }) => {
  return { profile, social }
}
export default connect(
  mapStateToProps,
  {
    ...profileActions,
    createCollection,
  }
)(withRouter(UserProfile))

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

const TabWrapper = styled.div`
  margin-bottom: 40px;
  padding: 0 5px;
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
