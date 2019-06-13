import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/feed'
import Collections from 'components/collections'
import Locker from 'components/locker/Locker'
import Sidebar from 'components/sidebar/Sidebar'
import Suggested from 'components/sidebar/Suggested'
import { customWrapper } from 'components/mixins'
import { fetchCollections, deleteCollection, createCollection } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './homeActions'
const Home = props => {
  const {
    auth,
    user,
    searchTerm,
    locker,
    location,
    feed,
    collections,
    following,
    followers,
    suggested,
    fetchCollections,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    deleteCollection,
    followAUser,
    fetchFeed,
    fetchLocker,
    fetchMoreFeed,
    createCollection,
  } = props

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
      fetchSuggested(auth.id)
    }
    if (!locker.length) {
      fetchLocker()
    }
    if (!collections.length) {
      fetchCollections()
    }
    // only fetch if feed post arr is length of zero
    if (!feed.posts.length) {
      fetchFeed()
    }
  }, [])

  return (
    <Container>
      <Sidebar
        user={user}
        collections={collections}
        followers={followers}
        following={following}
      />
      <Wrapper>
        <Tabs>
          <Tab>
            <NavLink
              exact
              to={`/feed`}
              className={location.pathname === '/' ? 'active' : null}
            >
              Feed
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`/saved`}>Saved</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`/locker`}>Locker(βeta)</NavLink>
          </Tab>
        </Tabs>
        <RouteWrapper>
          <Switch>
            <Route
              exact
              path={[`/`, `/feed`]}
              render={props => (
                <Feed
                  {...props}
                  auth={auth}
                  user={user}
                  searchTerm={searchTerm}
                  posts={feed.posts}
                  hasmore={feed.hasmore}
                  fetchMoreFeed={fetchMoreFeed}
                  offset={feed.offset}
                  createCollection={createCollection}
                />
              )}
            />
            <Route
              path={`/saved`}
              render={props => (
                <Collections
                  {...props}
                  userId={auth.id}
                  searchTerm={searchTerm}
                  collections={collections}
                  deleteCollection={deleteCollection}
                  fetchCollections={fetchCollections}
                />
              )}
            />
            <Route
              path={`/locker`}
              render={props => (
                <Locker
                  {...props}
                  auth={auth}
                  locker={locker}
                  fetchLocker={fetchLocker}
                />
              )}
            />
          </Switch>
        </RouteWrapper>
      </Wrapper>
      <Suggested
        auth={auth}
        suggested={suggested}
        fetchSuggested={fetchSuggested}
        fetchFollowing={fetchFollowing}
        followAUser={followAUser}
      />
    </Container>
  )
}
const mapStateToProps = ({
  auth,
  user,
  searchTerm,
  collections,
  home,
  social,
}) => ({
  auth,
  user,
  searchTerm,
  collections,
  feed: home,
  locker: home.locker,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    deleteCollection,
    createCollection,
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border: 2px solid red;
  width: 100vw;
`
const Wrapper = styled.div`
  max-width: 1440px;
  padding-left: 3%;
  width: 100%;
  border: 2px solid bloodorange;
`

const RouteWrapper = styled.div`
  position: relative;
`
const Tabs = styled.ul`
  display: flex;
  align-items: flex-end;
  position: sticky;
  border: 1px solid green;
  background: rgb(230, 233, 243);
  top: 59px;
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
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
  @media (max-width: 350px) {
    font-size: 1rem;
  }
`
