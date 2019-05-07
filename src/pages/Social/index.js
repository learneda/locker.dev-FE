import React from 'react';
import { connect } from 'react-redux';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';
import Following from '../../components/social/Following';
import Followers from '../../components/social/Followers';
import Suggested from '../../components/social/Suggested';
import Meetups from '../../components/social/Meetups';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';
import { setSocialTabIndex } from '../../actions';

const Social = props => {
  const {
    userId,
    following,
    followers,
    suggested,
    index,
    setSocialTabIndex,
  } = props;
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Grommet theme={theme}>
          <Tabs
            activeIndex={index}
            onActive={setSocialTabIndex}
            justify='start'
          >
            <Tab title='Following'>
              <TabWrapper>
                <Following userId={userId} following={following} />
              </TabWrapper>
            </Tab>
            <Tab title='Followers'>
              <TabWrapper>
                <Followers userId={userId} followers={followers} />
              </TabWrapper>
            </Tab>
            <Tab title='Suggested'>
              <TabWrapper>
                <Suggested userId={userId} suggested={suggested} />
              </TabWrapper>
            </Tab>
            <Tab title='Meetups'>
              <TabWrapper>
                <Meetups />
              </TabWrapper>
            </Tab>
          </Tabs>
        </Grommet>
      </Wrapper>
      {index === 3 ? <RecommendedFollow /> : null}
    </Container>
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
  { setSocialTabIndex }
)(Social);

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
};

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
