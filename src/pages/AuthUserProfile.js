import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import Home from './Home';
import RecommenededFollow from '../components/RecommendedFollow';

import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';

export default class AuthUserProfile extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <Wrapper>
          <Grommet theme={theme}>
            <Tabs justify="start" className="tabs">
              <Tab title="Home">
                <TabWrapper>
                  <Home />
                </TabWrapper>
              </Tab>
              <Tab title="Bookmarks">
                <TabWrapper>
                  <Bookmarks />
                </TabWrapper>
              </Tab>
              <Tab title="Recommended">
                <TabWrapper>
                  <Likes />
                </TabWrapper>
              </Tab>
            </Tabs>
          </Grommet>
        </Wrapper>
        <RecommenededFollow />
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
