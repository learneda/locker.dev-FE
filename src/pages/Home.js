import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';

export default class Home extends Component {
  render() {
    const theme = {
      tab: {
        margin: {
          bottom: '30px'
        }
      }
    };
    return (
      <Container>
        <Sidebar />
        <Grommet theme={theme}>
          <Tabs justify="start">
            <Tab title="Bookmarks">
              <Bookmarks />
            </Tab>
            <Tab title="Likes">
              <Likes />
            </Tab>
          </Tabs>
        </Grommet>
      </Container>
    );
  }
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
  display: flex;
`;
