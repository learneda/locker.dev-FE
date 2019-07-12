import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import SubNav from 'components/Bars/SubNav'
import styled from 'styled-components'
import Items from './components/Items'
import * as browseActions from './store/browseActions'

const Browse = props => {
  const {
    searchTerm,
    articles,
    courses,
    videos,
    podcasts,
    books,
    articleOffset,
    coursePage,
    videoPageToken,
    podcastOffset,
    bookOffset,
    fetchArticles,
    fetchCourses,
    fetchVideos,
    fetchPodcasts,
    fetchBooks,
    searchArticles,
    searchCourses,
    searchVideos,
    searchPodcasts,
    searchBooks,
    showIframe,
    resetIframe,
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
      <SubNav />
      <Container>
        <Switch>
          <Route
            exact
            path={[`${match.path}`, `${match.path}/articles`]}
            render={props => (
              <Items
                {...props}
                type='article'
                items={articles}
                searchTerm={searchTerm}
                offset={articleOffset}
                search={searchArticles}
                fetch={fetchArticles}
              />
            )}
          />
          <Route
            path={`${match.path}/courses`}
            render={props => (
              <Items
                {...props}
                type='course'
                items={courses}
                searchTerm={searchTerm}
                offset={coursePage}
                search={searchCourses}
                fetch={fetchCourses}
              />
            )}
          />

          <Route
            path={`${match.path}/videos`}
            render={props => (
              <Items
                {...props}
                type='video'
                items={videos}
                searchTerm={searchTerm}
                offset={videoPageToken}
                search={searchVideos}
                fetch={fetchVideos}
                showIframe={showIframe}
                resetIframe={resetIframe}
              />
            )}
          />
          <Route
            path={`${match.path}/podcasts`}
            render={props => (
              <Items
                {...props}
                type='podcast'
                items={podcasts}
                searchTerm={searchTerm}
                offset={podcastOffset}
                search={searchPodcasts}
                fetch={fetchPodcasts}
              />
            )}
          />
          <Route
            path={`${match.path}/books`}
            render={props => (
              <Items
                {...props}
                type='book'
                items={books}
                searchTerm={searchTerm}
                offset={bookOffset}
                search={searchBooks}
                fetch={fetchBooks}
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
  { ...browseActions }
)(withRouter(Browse))

Browse.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  podcasts: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  articleOffset: PropTypes.number.isRequired,
  coursePage: PropTypes.number.isRequired,
  videoPageToken: PropTypes.string.isRequired,
  podcastOffset: PropTypes.number.isRequired,
  bookOffset: PropTypes.number.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  fetchVideos: PropTypes.func.isRequired,
  fetchPodcasts: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  searchArticles: PropTypes.func.isRequired,
  searchCourses: PropTypes.func.isRequired,
  searchVideos: PropTypes.func.isRequired,
  searchPodcasts: PropTypes.func.isRequired,
  searchBooks: PropTypes.func.isRequired,
  showIframe: PropTypes.func.isRequired,
  resetIframe: PropTypes.func.isRequired,
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`
