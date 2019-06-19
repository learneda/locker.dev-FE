import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavBrowse from './components/NavBrowse'
import styled from 'styled-components'
import Items from './components/Items'

import { createCollection, postToFeed } from 'actions'
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
    postToFeed,
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
              <Items
                {...props}
                type='article'
                items={articles}
                searchTerm={searchTerm}
                offset={articleOffset}
                search={searchArticles}
                fetch={fetchArticles}
                save={createCollection}
                share={postToFeed}
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
                save={createCollection}
                share={postToFeed}
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
                save={createCollection}
                share={postToFeed}
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
                save={createCollection}
                share={postToFeed}
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
                save={createCollection}
                share={postToFeed}
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
    postToFeed,
  }
)(withRouter(Browse))

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
`
