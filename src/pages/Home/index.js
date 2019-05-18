import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Feed from '../../components/feed'
import Collections from '../../components/collections'
import Likes from '../../components/likes/Likes'
import Sidebar from '../../components/sidebar/Sidebar'
import RecommendedFollow from '../../components/sidebar/RecommendedFollow'
import { customWrapper } from '../../components/mixins'

class Home extends Component {
  render() {
    return (
      <Grommet theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Tabs>
            <Tab>
              <NavLink
                exact
                to='/home/feed'
                className={
                  this.props.location.pathname === '/home' ? 'active' : null
                }
              >
                Feed
              </NavLink>
            </Tab>
            <Tab>
              <NavLink to='/home/collections'>Collections</NavLink>
            </Tab>
            <Tab>
              <NavLink to='/home/locker'>Locker(Alpha)</NavLink>
            </Tab>
          </Tabs>
          <Container>
            <Sidebar />
            <Wrapper>
              <TabWrapper>
                <Switch>
                  <Route
                    exact
                    path={['/home', '/home/feed']}
                    render={props => <Feed {...props} />}
                  />
                  <Route
                    path='/home/collections'
                    render={props => <Collections {...props} />}
                  />
                  <Route
                    path='/home/locker'
                    render={props => <Likes {...props} />}
                  />
                </Switch>
              </TabWrapper>
            </Wrapper>
            <RecommendedFollow />
          </Container>
        </div>
      </Grommet>
    )
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Home)
)

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
}

const Container = styled.div`
  outline: 1px solid red;
  ${customWrapper('80%', '0 auto')};
  display: flex;
  justify-content: space-between;
  @media (max-width: 1400px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  max-width: 1440px;
  padding-left: 2%;
  width: 100%;
  @media (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    padding: 0;
  }
`

const TabWrapper = styled.div`
  position: relative;
  @media (max-width: 900px) {
    margin-top: 20px;
  }
`

const Tabs = styled.ul`
  outline: 1px solid red;
  display: flex;
  position: sticky;
  justify-content: center;
  background: rgb(230, 233, 243);
  top: 60px;
  padding: 10px 0 0px;
  z-index: 2;
  width: 100%;
  /* border-bottom: 3px solid transparent; */
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
  @media (max-width: 900px) {
  }
  @media (max-width: 760px) {
    padding-bottom: 0px;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
  margin-bottom: 9px;
  margin-left: 5px;
`
