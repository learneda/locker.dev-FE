import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavBrowse from './components/NavBrowse'
import styled from 'styled-components'
import Courses from './components/Courses'
import Articles from './components/Articles'
import Videos from './components/Videos'
import Books from './components/Books'
import Podcasts from './components/Podcasts'
import { createCollection } from 'actions'
import * as browseActions from './store/browseActions'

const Browse = props => {
  const {
    searchTerm,
    articles,
    courses,
    videos,
    books,
    podcasts,
    coursePage,
    articleOffset,
    videoPageToken,
    podcastOffset,
    bookOffset,
    fetchCourses,
    fetchArticles,
    fetchVideos,
    fetchBooks,
    fetchPodcasts,
    searchCourses,
    searchArticles,
    searchVideos,
    searchBooks,
    searchPodcasts,
    showIframe,
    resetIframe,
    createCollection,
    match,
  } = props

  useEffect(() => {
    if (!courses.length) {
      fetchCourses(searchTerm, coursePage)
    }
    if (!articles.length) {
      fetchArticles(searchTerm, articleOffset)
    }
    if (!books.length) {
      fetchBooks(searchTerm, bookOffset)
    }
    if (!videos.length) {
      fetchVideos(searchTerm, videoPageToken)
    }
    if (!podcasts.length) {
      fetchPodcasts(searchTerm, podcastOffset)
    }
  }, [])

  return (
    <Wrapper>
      <NavBrowse />
      <Container>
        <Switch>
          <Route
            exact
            path={[`${match.path}`, `${match.path}/articles`]}
            render={props => (
              <Articles
                {...props}
                articles={articles}
                searchTerm={searchTerm}
                articleOffset={articleOffset}
                searchArticles={searchArticles}
                fetchArticles={fetchArticles}
                createCollection={createCollection}
              />
            )}
          />
          <Route
            path={`${match.path}/courses`}
            render={props => (
              <Courses
                {...props}
                courses={courses}
                searchTerm={searchTerm}
                coursePage={coursePage}
                searchCourses={searchCourses}
                fetchCourses={fetchCourses}
                createCollection={createCollection}
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
                fetchVideos={fetchVideos}
                createCollection={createCollection}
                showIframe={showIframe}
                resetIframe={resetIframe}
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
                fetchPodcasts={fetchPodcasts}
                createCollection={createCollection}
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
                searchBooks={searchBooks}
                fetchBooks={fetchBooks}
                createCollection={createCollection}
              />
            )}
          />
        </Switch>
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = ({ search, browse }) => ({
  searchTerm: search.searchTerm,
  ...browse,
})

export default connect(
  mapStateToProps,
  {
    ...browseActions,
    createCollection,
  }
)(withRouter(Browse))

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
`
