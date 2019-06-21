import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from 'components/sidebar/Sidebar'
import Tagbar from 'components/sidebar/Tagbar'
import Feed from './components/feed'
import Suggested from 'components/sidebar/Suggested'
import Footer from 'components/sidebar/Footer'
import { fetchCollections, deleteCollection, createCollection } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './store/homeActions'
const Home = props => {
  const {
    auth,
    user,
    searchTerm,
    locker,
    location,
    feed,
    collections,
    following,
    followers,
    suggested,
    topTags,
    myTags,
    fetchCollections,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    deleteCollection,
    followAUser,
    fetchFeed,
    fetchLocker,
    fetchMoreFeed,
    createCollection,
    fetchTopTags,
    fetchMyTags,
  } = props

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
      fetchSuggested(auth.id)
    }
    if (!collections.length) {
      fetchCollections()
    }
    // only fetch if feed post arr is length of zero
    if (!feed.posts.length) {
      fetchFeed()
    }
    if (!topTags.length) {
      fetchTopTags()
    }
    fetchMyTags()
  }, [])

  return (
    <Container>
      <WrapperLeft>
        <Sidebar
          user={user}
          collections={collections}
          followers={followers}
          following={following}
        />
        <Tagbar topTags={topTags} myTags={myTags} />
      </WrapperLeft>
      <Feed
        {...props}
        auth={auth}
        user={user}
        searchTerm={searchTerm}
        posts={feed.posts}
        hasmore={feed.hasmore}
        fetchMoreFeed={fetchMoreFeed}
        offset={feed.offset}
        createCollection={createCollection}
      />
      <WrapperRight>
        <Suggested
          auth={auth}
          suggested={suggested}
          fetchSuggested={fetchSuggested}
          fetchFollowing={fetchFollowing}
          followAUser={followAUser}
        />
        <Footer />
      </WrapperRight>
    </Container>
  )
}
const mapStateToProps = ({
  auth,
  user,
  search,
  collections,
  home,
  social,
}) => ({
  auth,
  user,
  searchTerm: search.searchTerm,
  collections,
  feed: home,
  locker: home.locker,
  topTags: home.topTags,
  myTags: home.myTags,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    deleteCollection,
    createCollection,
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 15px auto 0px;
  padding: 0 15px 30px;
  @media (max-width: 1180px) {
    justify-content: space-around;
  }
  @media (max-width: 620px) {
    padding: 0;
  }
`
const WrapperLeft = styled.div`
  position: relative;
  width: 280px;
  transition: opacity 300ms ease;
  opacity: 1;
  @media (max-width: 920px) {
    opacity: 0;
    display: none;
  }
`

const WrapperRight = styled.div`
  position: relative;
  width: 260px;
  opacity: 1;
  transition: opacity 300ms ease;
  @media (max-width: 1180px) {
    opacity: 0;
    display: none;
  }
`
