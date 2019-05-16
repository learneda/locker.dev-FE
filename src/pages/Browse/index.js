import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import { withAlert } from 'react-alert'
import axios from 'axios'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Courses from '../../components/browse/Courses'
import Videos from '../../components/browse/Videos'
import Articles from '../../components/browse/Articles'
import Podcasts from '../../components/browse/Podcasts'
import Books from '../../components/browse/Books'

import { getPosts, getCourses, getArticles, fetchUser } from '../../actions'
import { customWrapper, truncateText } from '../../components/mixins'
import { post as URL } from '../../services/baseURL'

axios.defaults.withCredentials = true

class Browse extends Component {
  state = {
    page: 1,
  }
  componentDidMount() {
    this.props.getCourses(this.state.page)
    this.props.getArticles()
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      axios.post(`${URL}/api/posts`, {
        post_url: url,
        id: this.props.auth.id,
      })
    }
  }

  handleSaveMedia = async media => {
    if (this.props.auth) {
      await axios.post(`${URL}/api/posts`, {
        ...media,
        user_id: this.props.auth.id,
      })
      this.props.getPosts()
    }
  }

  handleTruncateText = (content, limit = 10) => {
    return truncateText(content, limit)
  }

  getMoreCourses = () => {
    this.setState({
      page: this.state.page + 1,
    })
    this.props.getCourses(this.state.page)
  }

  render() {
    const { articles, courses } = this.props

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
              <Tab>
                <NavLink to='/browse/books'>Books</NavLink>
              </Tab>
              <Tab>
                <NavLink to='/browse/podcasts'>Podcasts</NavLink>
              </Tab>
            </Tabs>
            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={['/browse', '/browse/courses']}
                  render={props => (
                    <Courses
                      {...props}
                      courses={courses}
                      getMoreCourses={this.getMoreCourses}
                      handleSaveLink={this.handleSaveLink}
                      handleTruncateText={this.handleTruncateText}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path='/browse/articles'
                  render={props => (
                    <Articles
                      {...props}
                      articles={articles}
                      handleTruncateText={this.handleTruncateText}
                      handleSaveLink={this.handleSaveLink}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path='/browse/videos'
                  render={props => (
                    <Videos
                      {...props}
                      handleTruncateText={this.handleTruncateText}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path='/browse/books'
                  render={props => (
                    <Books
                      {...props}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path='/browse/podcasts'
                  render={props => (
                    <Podcasts
                      {...props}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
              </Switch>
            </TabWrapper>
          </BrowseContainer>
        </Wrapper>
      </Grommet>
    )
  }
}

const mapStateToProps = state => {
  return {
    courses: state.browse.courses,
    articles: state.browse.articles,
    auth: state.auth,
    index: state.browse.index,
  }
}

const Alert = withAlert()(Browse)

export default connect(
  mapStateToProps,
  { getPosts, getCourses, getArticles, fetchUser }
)(Alert)

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
}

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media(max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
`

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
  font-size: 1.6rem;
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
`
