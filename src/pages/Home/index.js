import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/feed'
import Collections from 'components/collections'
import Locker from 'components/locker/Locker'
import Sidebar from 'components/sidebar/Sidebar'
import Suggested from 'components/sidebar/Suggested'
import Tagbar from 'components/sidebar/Tagbar'
import Footer from 'components/sidebar/Footer'
import { customWrapper } from 'components/mixins'
import { fetchCollections, deleteCollection, createCollection } from 'actions'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './homeActions'
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
        <Tagbar topTags={topTags} />
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
  margin: 15px auto 30px;
  padding: 0 20px;
  @media (max-width: 1200px) {
    justify-content: space-around;
  }
  @media (max-width: 620px) {
    padding: 0;
  }
  /* border: 1px solid dodgerblue; */
`
const WrapperLeft = styled.div`
  position: relative;
  width: 260px;
  transition: opacity 100ms ease;
  @media (max-width: 900px) {
    opacity: 0;
    display: none;
  }

  /* border: 1px solid red; */
`

const WrapperRight = styled.div`
  position: relative;
  width: 260px;
  opacity: 1;
  transition: opacity 100ms ease;
  @media (max-width: 1200px) {
    opacity: 0;
    display: none;
  }
`
