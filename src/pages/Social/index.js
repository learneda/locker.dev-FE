import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import Following from '../../components/social/Following';
import Followers from '../../components/social/Followers';
import Suggested from '../../components/social/Suggested';
import Meetups from '../../components/social/Meetups';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';

const Social = props => {
  const { userId, following, followers, suggested, index } = props;
  return (
    <Grommet>
      <Container>
        <Sidebar />
        <Wrapper>
          <Tabs>
            <Tab>
              <NavLink to='/social/following'>Following</NavLink>
            </Tab>
            <Tab>
              <NavLink to='/social/followers'>Followers</NavLink>
            </Tab>
            <Tab>
              <NavLink to='/social/suggested'>Suggested</NavLink>
            </Tab>
            <Tab>
              <NavLink to='/social/meetups'>Meetups</NavLink>
            </Tab>
          </Tabs>

          <TabWrapper>
            <Switch>
              <Route
                exact
                path={['/social/', '/social/following']}
                render={props => (
                  <Following {...props} userId={userId} following={following} />
                )}
              />
              <Route
                path='/social/followers'
                render={props => (
                  <Followers {...props} userId={userId} followers={followers} />
                )}
              />
              <Route
                path='/social/suggested'
                render={props => (
                  <Suggested {...props} userId={userId} suggested={suggested} />
                )}
              />
              <Route
                path='/social/meetups'
                render={props => <Meetups {...props} />}
              />
            </Switch>
          </TabWrapper>
        </Wrapper>
      </Container>
    </Grommet>
  );
};

const mapStateToProps = ({ auth, social, follow }) => ({
  index: social.index,
  userId: auth.id,
  following: follow.userFollowing,
  followers: follow.userFollowers,
  suggested: follow.suggestedFriends,
});

export default connect(
  mapStateToProps,
  null
)(Social);

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
`;

const Wrapper = styled.div`
  max-width: 1600px;
  padding-left: 2%;
  width: 100%;
  @media (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    padding: 0;
  }
`;

const TabWrapper = styled.div`
  border-top: 1px solid #bdbdbd;
  padding-top: 20px;
  margin-top: -3px;
`;

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  margin-right: 2rem;
`;
