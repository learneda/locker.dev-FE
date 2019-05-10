import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import Feed from '../../components/feed';
import Bookmarks from '../../components/bookmarks';
import Likes from '../../components/likes/Likes';
import Sidebar from '../../components/sidebar/Sidebar';
import RecommendedFollow from '../../components/sidebar/RecommendedFollow';
import { customWrapper } from '../../components/mixins';
import { setHomeTabIndex } from '../../actions';

class Home extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <Wrapper>
          <Grommet theme={theme}>
            <Tabs>
              <Tab>
                <NavLink exact to='/home/feed'>
                  Feed
                </NavLink>
              </Tab>
              <Tab>
                <NavLink to='/home/bookmarks'>Bookmarks</NavLink>
              </Tab>
              <Tab>
                <NavLink to='/home/likes'>Likes</NavLink>
              </Tab>
            </Tabs>
            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={['/home', '/home/feed']}
                  render={props => <Feed {...props} />}
                />
                <Route
                  path='/home/bookmarks'
                  render={props => <Bookmarks {...props} />}
                />
                <Route
                  path='/home/likes'
                  render={props => <Likes {...props} />}
                />
              </Switch>
            </TabWrapper>
          </Grommet>
        </Wrapper>
        <RecommendedFollow />
      </Container>
    );
  }
}

const mapStateToProps = ({ home }) => ({ index: home.index });

export default connect(
  mapStateToProps,
  { setHomeTabIndex }
)(Home);

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

const Tabs = styled.ul`
  display: flex;
  position: fixed;
  height: 135px;
  background: rgb(230, 233, 243);
  z-index: 1;
  top: 0;
  align-items: flex-end;
  width: 100%;
  margin-left: -5px;
`;

const Tab = styled.li`
  margin-right: 2rem;
  margin-bottom: 15px;
  margin-left: 5px;
  .active {
    border-bottom: 3px solid #222;
    font-weight: 900;
  }
`;
