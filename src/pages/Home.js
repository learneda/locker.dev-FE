import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <h2>News Feed</h2>
      </Container>
    );
  }
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
`;
