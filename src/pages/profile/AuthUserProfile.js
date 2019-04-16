import React, { Component } from 'react';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';

import Home from '../Home';
import Bookmarks from './Bookmarks';
import Likes from '../../components/recommended/Likes';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';

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
        <RecommendedFollow />
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
  justify-content: space-between;
  @media (max-width: 1400px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  /* ${customWrapper('60%')} */
  max-width: 800px;
  padding-left: 2%;
  width: 70%;
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
