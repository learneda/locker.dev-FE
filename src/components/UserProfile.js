import React, { Component } from 'react';
import Bookmarks from './Bookmarks';
import Likes from './Likes';
import Sidebar from './Sidebar';
import styled from 'styled-components';

import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <Wrapper>
          <Grommet theme={theme}>
            <Tabs justify="start" className="tabs">
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
`;

const Wrapper = styled.div`
  ${customWrapper('75%')}
  padding-left: 2%;
`;

const TabWrapper = styled.div`
  border-top: 1px solid #bdbdbd;
  padding-top: 20px;
  margin-top: -3px;
  margin-left: 12px;
`;
