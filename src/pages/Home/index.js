import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Feed from '../../components/feed'
import Collections from '../../components/collections'
import Likes from '../../components/likes/Likes'
import Sidebar from '../../components/sidebar/Sidebar'
import Suggested from '../../components/sidebar/Suggested'
import { customWrapper } from '../../components/mixins'
import {
  populateNotifications,
  deletePost,
  fetchUser,
  fetchFollowers,
  fetchFollowing,
  fetchSuggested,
  fetchLocker,
  fetchPosts,
  followAUser,
} from '../../actions'
class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchLocker()
    this.props.fetchUser(this.props.auth.id)
    this.props.fetchSuggested(this.props.auth.id)
    this.props.fetchFollowing(this.props.auth.id)
    this.props.fetchFollowers(this.props.auth.id)
  }

  componentWillUnmount() {}

  render() {
    const {
      auth,
      user,
      searchTerm,
      locker,
      location,
      match,
      posts,
      likedPosts,
      following,
      followers,
      suggested,
      populateNotifications,
      fetchUser,
      fetchLocker,
      fetchPosts,
      fetchFollowers,
      fetchFollowing,
      fetchSuggested,
      followAUser,
      deletePost,
    } = this.props
    return (
      <Grommet theme={theme}>
        <Container>
          <Sidebar
            auth={auth}
            user={user}
            posts={posts}
            followers={followers}
            following={following}
            fetchFollowers={fetchFollowers}
            fetchFollowing={fetchFollowing}
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
                      populateNotifications={populateNotifications}
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
                      posts={posts}
                      deletePost={deletePost}
                      fetchPosts={fetchPosts}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/locker`}
                  render={props => (
                    <Likes
                      {...props}
                      auth={auth}
                      locker={locker}
                      fetchUser={fetchUser}
                      fetchLocker={fetchLocker}
                      likedPosts={likedPosts}
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
}
const mapStateToProps = ({
  auth,
  user,
  searchTerm,
  posts,
  likedPosts,
  locker,
  social,
}) => ({
  auth,
  user,
  searchTerm,
  posts,
  likedPosts,
  locker,
  following: social.following,
  followers: social.followers,
  suggested: social.suggested,
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      populateNotifications,
      deletePost,
      fetchUser,
      fetchLocker,
      fetchPosts,
      fetchFollowers,
      fetchFollowing,
      fetchSuggested,
      followAUser,
    }
  )(Home)
)

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
  padding-left: 2%;
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
  position: sticky;
  background: rgb(230, 233, 243);
  top: 59px;
  padding: 10px 0 5px;
  z-index: 1;
  width: 100%;
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
  @media (max-width: 760px) {
    top: 50px;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
  margin-bottom: 9px;
  margin-left: 5px;
`
