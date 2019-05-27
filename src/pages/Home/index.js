import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Feed from 'components/feed'
import Collections from 'components/collections'
import Locker from 'components/locker/Locker'
import Sidebar from 'components/sidebar/Sidebar'
import Suggested from 'components/sidebar/Suggested'
import { customWrapper } from 'components/mixins'
import { fetchUser, fetchCollections, deleteCollection } from 'actions'
import { fetchNotifications } from 'actions/notificationActions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './homeActions'
const Home = props => {
  const {
    auth,
    user,
    searchTerm,
    locker,
    location,
    match,
    feed,
    collections,
    following,
    followers,
    suggested,
    fetchUser,
    fetchCollections,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    fetchNotifications,
    deleteCollection,
    followAUser,
    fetchFeed,
    fetchLocker,
    fetchMoreFeed,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
  } = props

  useEffect(() => {
    if (!user) {
      fetchUser(auth.id)
    }
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
    <Grommet theme={theme}>
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
                to={`${match.url}/feed`}
                className={location.pathname === '/home' ? 'active' : null}
              >
                Feed
              </NavLink>
            </Tab>
            <Tab>
              <NavLink to={`${match.url}/collections`}>Collections</NavLink>
            </Tab>
            <Tab>
              <NavLink to={`${match.url}/locker`}>Locker(α)</NavLink>
            </Tab>
          </Tabs>
          <TabWrapper>
            <Switch>
              <Route
                exact
                path={[`${match.path}`, `${match.path}/feed`]}
                render={props => (
                  <Feed
                    {...props}
                    auth={auth}
                    user={user}
                    searchTerm={searchTerm}
                    fetchNotifications={fetchNotifications}
                    posts={feed.posts}
                    hasmore={feed.hasmore}
                    fetchMoreFeed={fetchMoreFeed}
                    offset={feed.offset}
                    createComment={createComment}
                    deleteComment={deleteComment}
                    likeComment={likeComment}
                    unlikeComment={unlikeComment}
                  />
                )}
              />
              <Route
                path={`${match.path}/collections`}
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
                path={`${match.path}/locker`}
                render={props => (
                  <Locker
                    {...props}
                    auth={auth}
                    locker={locker}
                    fetchUser={fetchUser}
                    fetchLocker={fetchLocker}
                  />
                )}
              />
            </Switch>
          </TabWrapper>
        </Wrapper>
        <Suggested
          auth={auth}
          suggested={suggested}
          fetchUser={fetchUser}
          fetchSuggested={fetchSuggested}
          fetchFollowing={fetchFollowing}
          followAUser={followAUser}
        />
      </Container>
    </Grommet>
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
    fetchUser,
    fetchNotifications,
    fetchCollections,
    deleteCollection,
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

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
  ${customWrapper('80%', '0 auto')};
  display: flex;
  justify-content: space-between;
  @media (max-width: 1400px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  max-width: 1440px;
  padding-left: 3%;
  width: 100%;
  @media (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    padding: 0;
  }
`

const TabWrapper = styled.div`
  position: relative;
`

const Tabs = styled.ul`
  display: flex;
  align-items: flex-end;
  position: sticky;
  background: rgb(230, 233, 243);
  top: 59px;
  font-size: 2rem;
  height: 90px;
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
    height: 85px;
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
