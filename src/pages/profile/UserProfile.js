import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';

import Likes from '../../components/likes/Likes';
import { customWrapper } from '../../components/mixins';
import SidebarById from '../../components/sidebar/SidebarById';
import ProfileById from './ProfileById';

class UserProfile extends Component {
  render() {
    return (
      <Container>
        <SidebarById />
        <Wrapper>
          <Grommet theme={theme}>
            <Tabs justify="start" className="tabs">
              <Tab title="Bookmarks">
                <TabWrapper>
                  <ProfileById />
                </TabWrapper>
              </Tab>
              <Tab title="Likes">
                <TabWrapper>
                  <Likes />
                </TabWrapper>
              </Tab>
            </Tabs>
          </Grommet>
        </Wrapper>
      </Container>
    );
  }
}

const theme = {
  tab: {
    color: 'dark-1',
    active: {
      weight: 'bold'
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: {
        light: null
      },
      active: {
        color: {
          light: 'dark-1'
        }
      },
      hover: {
        color: {
          light: null
        }
      },
      margin: {
        bottom: '30px'
      }
    }
  }
};

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
  display: flex;
  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  ${customWrapper('75%')}
  padding-left: 2%;
  @media (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`;

const TabWrapper = styled.div`
  border-top: 1px solid #bdbdbd;
  padding-top: 20px;
  margin-top: -3px;
  margin-left: 12px;
`;

export default withRouter(UserProfile);
