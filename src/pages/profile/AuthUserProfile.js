import React, { Component } from 'react';
import { Grommet, Tab, Tabs } from 'grommet';
import styled from 'styled-components';
import axios from 'axios';
import Home from '../Home';
import Bookmarks from './Bookmarks';
import Likes from '../../components/likes/Likes';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';
import { connect } from 'react-redux';

class AuthUserProfile extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <Wrapper>
          <Grommet theme={theme}>
            <Tabs justify="start" className="tabs">
              <Tab title="Feed">
                <TabWrapper>
                  <Home />
                </TabWrapper>
              </Tab>
              <Tab title="Bookmarks">
                <TabWrapper>
                  <Bookmarks />
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
        <RecommendedFollow />
      </Container>
    );
  }
}

export default AuthUserProfile;

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
