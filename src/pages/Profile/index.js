import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import { setProfileTabIndex } from '../../actions';
import { customWrapper } from '../../components/mixins';
import SidebarById from '../../components/sidebar/SidebarById';
import ProfileById from '../../components/profile';
import UserFollowing from '../../components/profile/UserFollowing';
import UserFollowers from '../../components/profile/UserFollowers';

class UserProfile extends Component {
  render() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params.id);
    return (
      <Grommet theme={theme}>
        <Container>
          <SidebarById />
          <Wrapper>
            {/* <Tabs
              // activeIndex={this.props.index}
              // onActive={this.props.setProfileTabIndex}
              // justify='start'
              className='tabs'
            >
              <Tab>
                <NavLink to={`/profile/${id}/following`}>Bookmarks</NavLink>
              </Tab>
              <Tab>
                <NavLink to={`/profile/${id}/likes`}>Likes</NavLink>
              </Tab>
            </Tabs> */}
            <div className='tabs'>
              <NavLink to={`/profile/${id}`}>Bookmarks</NavLink>
              <NavLink to={`/profile/${id}/likes`}>Likes</NavLink>
              <NavLink to={`/profile/${id}/following`}>Following</NavLink>
              <NavLink to={`/profile/${id}/followers`}>Followers</NavLink>
            </div>

            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={`/profile/:id`}
                  render={props => <ProfileById {...props} />}
                />
                <Route
                  exact
                  path={'/profile/:id/following'}
                  render={props => <UserFollowing {...props} />}
                />
                <Route
                  exact
                  path={'/profile/:id/followers'}
                  render={props => <UserFollowers {...props} />}
                />
              </Switch>
            </TabWrapper>
          </Wrapper>
        </Container>
      </Grommet>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ index: profile.index });

export default withRouter(
  connect(
    mapStateToProps,
    { setProfileTabIndex }
  )(UserProfile)
);

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
  @media (max-width: 1100px) {
    width: 90%;
  }
  .tabs {
    position: fixed;
    top: 0;
    z-index: 2;
    align-items: flex-end;
    height: 135px;
    display: flex;
    background: rgb(230, 233, 243);
    width: 100%;
    padding-bottom: 5px;

    a {
      margin-right: 10px;
      margin-right: 2rem;
      margin-bottom: 9px;
      margin-left: 12px;
    }
    .active {
      border-bottom: 3px solid #4064f2;
      font-weight: 900;
      color: #4064f2;
    }
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
  padding-top: 20px;
  margin-top: -3px;
  margin-left: 12px;
  @media (max-width: 900px) {
    margin-left: 0;
  }
`;
