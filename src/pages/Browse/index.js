import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { withAlert } from 'react-alert'
import styled from 'styled-components'
import Courses from 'components/browse/Courses'
import Articles from 'components/browse/Articles'
import Videos from 'components/browse/Videos'
import Books from 'components/browse/Books'
import Podcasts from 'components/browse/Podcasts'
import { withLayout } from 'components/hoc/withLayout'
import {
  fetchUser,
  fetchCourses,
  searchCourses,
  fetchArticles,
  searchArticles,
  fetchBooks,
  searchBooks,
  fetchVideos,
  searchVideos,
  fetchPodcasts,
  searchPodcasts,
  setCoursePage,
  setArticleOffset,
  setBookOffset,
  showIframe,
  resetIframe,
  createPost,
} from 'actions'
import { customWrapper, smartTruncate } from 'components/mixins'

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
    if (!this.props.books.length) {
      this.props.fetchBooks(this.props.searchTerm, this.props.bookOffset)
      this.props.setBookOffset(this.props.bookOffset + 12)
    }
    if (!this.props.videos.length) {
      this.props.fetchVideos(this.props.searchTerm, this.props.videoPageToken)
    }
    if (!this.props.podcasts.length) {
      this.props.fetchPodcasts(this.props.searchTerm, this.props.podcastOffset)
    }
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      this.props.createPost({
        post_url: url,
      })
    }
  }

  handleSaveMedia = media => {
    if (this.props.auth) {
      this.props.createPost({
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

  fetchMoreBooks = () => {
    this.props.fetchBooks(this.props.searchTerm, this.props.bookOffset)
    this.props.setBookOffset(this.props.bookOffset + 12)
  }

  fetchMoreVideos = () => {
    this.props.fetchVideos(this.props.searchTerm, this.props.videoPageToken)
  }

  fetchMorePodcasts = () => {
    this.props.fetchPodcasts(this.props.searchTerm, this.props.podcastOffset)
  }

  render() {
    const {
      searchTerm,
      articles,
      articleOffset,
      courses,
      coursePage,
      books,
      bookOffset,
      videos,
      videoPageToken,
      podcasts,
      podcastOffset,
      setArticleOffset,
      setCoursePage,
      setBookOffset,
      searchArticles,
      searchCourses,
      searchBooks,
      searchVideos,
      searchPodcasts,
      showIframe,
      resetIframe,
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
                  videos={videos}
                  searchTerm={searchTerm}
                  videoPageToken={videoPageToken}
                  searchVideos={searchVideos}
                  fetchMoreVideos={this.fetchMoreVideos}
                  handleTruncateText={this.handleTruncateText}
                  handleSaveMedia={this.handleSaveMedia}
                  showIframe={showIframe}
                  resetIframe={resetIframe}
                  alert={this.props.alert}
                />
              )}
            />
            <Route
              path={`${match.path}/books`}
              render={props => (
                <Books
                  {...props}
                  books={books}
                  searchTerm={searchTerm}
                  bookOffset={bookOffset}
                  setBookOffset={setBookOffset}
                  searchBooks={searchBooks}
                  fetchMoreBooks={this.fetchMoreBooks}
                  handleSaveMedia={this.handleSaveMedia}
                  handleTruncateText={this.handleTruncateText}
                  alert={this.props.alert}
                />
              )}
            />
            <Route
              path={`${match.path}/podcasts`}
              render={props => (
                <Podcasts
                  {...props}
                  podcasts={podcasts}
                  searchTerm={searchTerm}
                  podcastOffset={podcastOffset}
                  searchPodcasts={searchPodcasts}
                  fetchMorePodcasts={this.fetchMorePodcasts}
                  handleTruncateText={this.handleTruncateText}
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
    fetchVideos,
    searchVideos,
    setCoursePage,
    setArticleOffset,
    showIframe,
    createPost,
    fetchBooks,
    searchBooks,
    setBookOffset,
    fetchPodcasts,
    searchPodcasts,
    resetIframe,
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
