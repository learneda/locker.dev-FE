import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { withAlert } from 'react-alert'
import axios from 'axios'
import styled from 'styled-components'
import Courses from 'components/browse/Courses'
import Videos from 'components/browse/Videos'
import Articles from 'components/browse/Articles'
import Podcasts from 'components/browse/Podcasts'
import Books from 'components/browse/Books'
import { withLayout } from 'components/hoc/withLayout'
import {
  fetchUser,
  fetchCourses,
  searchCourses,
  fetchArticles,
  searchArticles,
  setCoursePage,
  setArticleOffset,
  createPost,
} from '../../actions'
import { customWrapper, smartTruncate } from '../../components/mixins'
import { post as URL } from '../../services/baseURL'

axios.defaults.withCredentials = true

class Browse extends Component {
  componentDidMount() {
    if (!this.props.courses.length) {
      this.props.fetchCourses(this.props.searchTerm, this.props.coursePage)
      this.props.setCoursePage(this.props.coursePage + 1)
    }
    if (!this.props.articles.length) {
      this.props.fetchArticles(this.props.searchTerm, this.props.articleOffset)
      this.props.setArticleOffset(this.props.articleOffset + 12)
    }
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      this.props.createPost({
        post_url: url,
      })
    }
  }

  handleSaveMedia = async media => {
    if (this.props.auth) {
      await axios.post(`${URL}/api/posts`, {
        ...media,
        user_id: this.props.auth.id,
      })
    }
  }

  handleTruncateText = (content, limit = 10) => {
    return smartTruncate(content, limit)
  }

  fetchMoreCourses = () => {
    this.props.fetchCourses(this.props.searchTerm, this.props.coursePage)
    this.props.setCoursePage(this.props.coursePage + 1)
  }

  fetchMoreArticles = () => {
    this.props.fetchArticles(this.props.searchTerm, this.props.articleOffset)
    this.props.setArticleOffset(this.props.articleOffset + 12)
  }

  render() {
    const {
      searchTerm,
      articles,
      articleOffset,
      courses,
      coursePage,
      setArticleOffset,
      setCoursePage,
      searchArticles,
      searchCourses,
      match,
    } = this.props
    return (
      <>
        <Tabs>
          <Tab>
            <NavLink exact to={`${match.url}/courses`}>
              Course
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/articles`}>Article</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/videos`}>Video</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/books`}>Book</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/podcasts`}>Podcast</NavLink>
          </Tab>
        </Tabs>
        <TabWrapper>
          <Switch>
            <Route
              exact
              path={[`${match.path}`, `${match.path}/courses`]}
              render={props => (
                <Courses
                  {...props}
                  courses={courses}
                  searchTerm={searchTerm}
                  coursePage={coursePage}
                  setCoursePage={setCoursePage}
                  searchCourses={searchCourses}
                  fetchMoreCourses={this.fetchMoreCourses}
                  handleSaveLink={this.handleSaveLink}
                  handleTruncateText={this.handleTruncateText}
                  alert={this.props.alert}
                />
              )}
            />
            <Route
              path={`${match.path}/articles`}
              render={props => (
                <Articles
                  {...props}
                  articles={articles}
                  searchTerm={searchTerm}
                  articleOffset={articleOffset}
                  setArticleOffset={setArticleOffset}
                  searchArticles={searchArticles}
                  fetchMoreArticles={this.fetchMoreArticles}
                  handleSaveLink={this.handleSaveLink}
                  handleTruncateText={this.handleTruncateText}
                  alert={this.props.alert}
                />
              )}
            />
            <Route
              path={`${match.path}/videos`}
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
              path={`${match.path}/books`}
              render={props => (
                <Books
                  {...props}
                  handleSaveMedia={this.handleSaveMedia}
                  alert={this.props.alert}
                />
              )}
            />
            <Route
              path={`${match.path}/podcasts`}
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
      </>
    )
  }
}

const mapStateToProps = ({ auth, searchTerm, browse }) => ({
  auth,
  searchTerm,
  ...browse,
})

const Alert = withLayout(withAlert()(Browse))
export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchCourses,
    searchCourses,
    fetchArticles,
    searchArticles,
    setCoursePage,
    setArticleOffset,
    createPost,
  }
)(withRouter(Alert))

// const BrowseContainer = styled.div`
//   h2 {
//     font-size: 3.5rem;
//     margin: 35px 0;
//   }
// `

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
  font-size: 1.8rem;
  @media (max-width: 400px) {
    font-size: 1.7rem;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
`
