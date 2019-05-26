import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Sidebar from 'components/sidebar/Sidebar'
import Following from 'components/social/Following'
import Followers from 'components/social/Followers'
import Suggested from 'components/social/Suggested'
import Meetups from 'components/social/Meetups'
import { customWrapper } from 'components/mixins'
import {
  followAUser,
  unfollowAUser,
  fetchUser,
  fetchFollowing,
  fetchFollowers,
  fetchSuggested,
  fetchCollections,
} from 'actions'
const Social = props => {
  const {
    userId,
    user,
    following,
    followers,
    suggested,
    collections,
    followAUser,
    unfollowAUser,
    fetchUser,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    fetchCollections,
    match,
  } = props

  useEffect(() => {
    fetchUser(userId)
    fetchFollowing(userId)
    fetchFollowers(userId)
    fetchSuggested(userId)
    fetchCollections(userId)
  }, [])
  return (
    <Grommet>
      <Container>
        <Sidebar
          user={user}
          collections={collections}
          following={following}
          followers={followers}
        />
        <Wrapper>
          <Tabs>
            <Tab>
              <NavLink to={`${match.url}/following`}>Following</NavLink>
            </Tab>
            <Tab>
              <NavLink to={`${match.url}/followers`}>Followers</NavLink>
            </Tab>
            <Tab>
              <NavLink to={`${match.url}/suggested`}>Suggested</NavLink>
            </Tab>
            <Tab>
              <NavLink to={`${match.url}/meetups`}>Meetups</NavLink>
            </Tab>
          </Tabs>
          <TabWrapper>
            <Switch>
              <Route
                exact
                path={[`${match.path}`, `${match.path}/following`]}
                render={props => (
                  <Following
                    {...props}
                    userId={userId}
                    user={user}
                    following={following}
                    followers={followers}
                    followAUser={followAUser}
                    unfollowAUser={unfollowAUser}
                    fetchFollowing={fetchFollowing}
                  />
                )}
              />
              <Route
                path={`${match.path}/followers`}
                render={props => (
                  <Followers
                    {...props}
                    userId={userId}
                    following={following}
                    followers={followers}
                    followAUser={followAUser}
                    fetchUser={fetchUser}
                    unfollowAUser={unfollowAUser}
                    fetchFollowing={fetchFollowing}
                  />
                )}
              />
              <Route
                path={`${match.path}/suggested`}
                render={props => (
                  <Suggested
                    {...props}
                    userId={userId}
                    suggested={suggested}
                    followAUser={followAUser}
                    fetchUser={fetchUser}
                    fetchFollowing={fetchFollowing}
                    fetchSuggested={fetchSuggested}
                  />
                )}
              />
              <Route path={`${match.path}/meetups`} component={Meetups} />
            </Switch>
          </TabWrapper>
        </Wrapper>
      </Container>
    </Grommet>
  )
}

const mapStateToProps = ({ auth, user, social, collections }) => ({
  userId: auth.id,
  user: user,
  following: social.following,
  followers: social.followers,
  suggested: social.suggested,
  collections,
})

export default connect(
  mapStateToProps,
  {
    followAUser,
    unfollowAUser,
    fetchUser,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    fetchCollections,
  }
)(withRouter(Social))

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
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
  max-width: 1600px;
  padding-left: 2%;
  width: 100%;
  @media (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    padding: 0;
  }
`

const TabWrapper = styled.div`
  border-top: 1px solid #bdbdbd;
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
`

const Tab = styled.li`
  margin-right: 2rem;
`
