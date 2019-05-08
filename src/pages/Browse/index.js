import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { withAlert } from 'react-alert';
import axios from 'axios';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Courses from '../../components/browse/Courses';
import Videos from '../../components/browse/Videos';
import Articles from '../../components/browse/Articles';

import {
  getCourses,
  getArticles,
  setBrowseTabIndex,
  fetchUser,
} from '../../actions';
import {
  customWrapper,
  customLayout,
  truncateText,
} from '../../components/mixins';
import { post as URL } from '../../services/baseURL';
import { ReactComponent as Add } from '../../assets/svg/add-icon.svg';
import { ReactComponent as Loading } from '../../assets/svg/circles.svg';
axios.defaults.withCredentials = true;

class Browse extends Component {
  state = {
    page: 1,
  };
  componentDidMount() {
    this.props.getCourses(this.state.page);
    this.props.getArticles();
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      axios.post(`${URL}/api/posts`, {
        post_url: url,
        id: this.props.auth.id,
      });
    }
  };

  handleTruncateText = (content, limit = 10) => {
    return truncateText(content, limit);
  };

  getMoreCourses = () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.props.getCourses(this.state.page);
  };

  render() {
    const { articles, courses } = this.props;

    return (
      <Grommet theme={theme}>
        <Wrapper>
          <BrowseContainer>
            <Tabs>
              <Tab>
                <NavLink exact to='/browse/courses'>
                  Courses
                </NavLink>
              </Tab>
              <Tab>
                <NavLink to='/browse/articles'>Articles</NavLink>
              </Tab>
              <Tab>
                <NavLink to='/browse/videos'>Videos</NavLink>
              </Tab>
            </Tabs>
            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={['/browse', '/browse/courses']}
                  render={props => (
                    <Courses
                      courses={courses}
                      getMoreCourses={this.getMoreCourses}
                      handleSaveLink={this.handleSaveLink}
                      handleTruncateText={this.handleTruncateText}
                      alert={this.props.alert}
                      {...props}
                    />
                  )}
                />
                <Route
                  path='/browse/articles'
                  render={props => (
                    <Articles
                      articles={articles}
                      handleTruncateText={this.handleTruncateText}
                      handleSaveLink={this.handleSaveLink}
                      alert={this.props.alert}
                      {...props}
                    />
                  )}
                />
                <Route
                  path='/browse/videos'
                  render={props => <Videos {...props} />}
                />
              </Switch>
            </TabWrapper>
          </BrowseContainer>
        </Wrapper>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.browse.courses,
    articles: state.browse.articles,
    auth: state.auth,
    index: state.browse.index,
  };
};

const Alert = withAlert()(Browse);

export default connect(
  mapStateToProps,
  { getCourses, getArticles, fetchUser, setBrowseTabIndex }
)(Alert);

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
    },
    margin: {
      vertical: 'small',
      horizontal: 'xsmall',
    },
  },
};

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`;

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`;

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media(max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
`;

const Cards = styled.div`
  border-top: 1px solid #bdbdbd;
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 0 6px;
  margin-top: -12px;
  padding: 40px 0;
  @media (max-width: 768px) {
    margin: -12px auto 0;
  }
`;

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 22%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  @media (max-width: 1500px) {
    width: 30%;
  }
  @media (max-width: 960px) {
    width: 45%;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  a {
    &:hover {
      h3 {
        text-decoration: underline;
      }
    }
  }

  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    // border: 1px solid red;
    height: 50px;
    margin: 10px 0;
    padding: 0 3%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }

  p {
    padding: 0 3%;
    height: 45px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #6d767e;
  }
`;

const SaveIcon = styled.div`
  // border: 1px solid red;
  ${customLayout('flex-end')}
  margin-top: 15px;
  padding: 0 4%;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
`;
const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`;

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  margin-right: 2rem;
`;
