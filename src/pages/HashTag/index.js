import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as tagActions from './store/tagActions'
import { createCollection } from 'actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'pages/Home/components/feed/'
import TagPageViewHeader from './components/tagHeader'

const HashTagFeed = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.fetchTagPosts(props.match.params.tag, 0)
    window.scrollTo(0, 0)
    return () => dispatch({ type: 'RESET_POSTS' })
  }, [props.history.location.pathname])

  const { isFollowing } = props.posts
  const { unfollowTag, followTag } = props
  return (
    <Container>
      <TagPageViewHeader
        tag={props.match.params.tag}
        isFollowing={isFollowing}
        unfollowTag={unfollowTag}
        followTag={followTag}
      />
      <Feed
        fetchMoreTagFeed={props.fetchTagPosts}
        offset={props.home.offset}
        hasmore={props.home.hasmore}
        posts={props.home.posts}
        tag={props.match.params.tag}
      />
    </Container>
  )
}

const mapStateToProps = ({ tagPosts, user, auth, home }) => ({
  posts: tagPosts,
  user: { ...auth, ...user },
  auth,
  home,
})

export default connect(
  mapStateToProps,
  {
    ...tagActions,
    createCollection,
  }
)(withRouter(HashTagFeed))

const Container = styled.div`
  max-width: 580px;
  margin: 0 auto;
  position: relative;
`
