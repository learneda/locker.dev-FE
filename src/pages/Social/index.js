import React from 'react';
import { connect } from 'react-redux';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';
import Following from '../../components/social/following';
import Followers from '../../components/social/followers';
import Recommended from '../../components/social/recommended';
import Meetups from '../../components/social/meetups';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';
import { setSocialTabIndex } from '../../actions';

const Social = props => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Grommet theme={theme}>
          <Tabs
            activeIndex={props.index}
            onActive={props.setSocialTabIndex}
            justify='start'
          >
            <Tab title='Following'>
              <TabWrapper>
                <Following />
              </TabWrapper>
            </Tab>
            <Tab title='Followers'>
              <TabWrapper>
                <Followers />
              </TabWrapper>
            </Tab>
            <Tab title='Recommended'>
              <TabWrapper>
                <Recommended />
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
      <RecommendedFollow />
    </Container>
  );
};

const mapStateToProps = ({ social }) => ({ index: social.index });

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
