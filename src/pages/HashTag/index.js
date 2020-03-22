import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Feed from 'containers/Feed/index'
import HashTagHeader from './components/TagHeader'
import * as tagActions from './store/tagActions'

const HashTagFeed = props => {
  const {
    match,
    location,
    home,
    posts,
    followTag,
    unfollowTag,
    fetchTagPosts,
  } = props
  const { isFollowing } = posts
  const dispatch = useDispatch()

  useEffect(() => {
    fetchTagPosts(match.params.tag, 0)
    window.scrollTo(0, 0)
    return () => dispatch({ type: 'RESET_POSTS' })
  }, [location.pathname])

  return (
    <Container>
      <HashTagHeader
        tag={match.params.tag}
        isFollowing={isFollowing}
        unfollowTag={unfollowTag}
        followTag={followTag}
      />
      <Feed
        fetchMoreTagFeed={fetchTagPosts}
        offset={home.offset}
        hasmore={home.hasmore}
        posts={home.posts}
        tag={match.params.tag}
      />
    </Container>
  )
}

const mapStateToProps = ({ home, tagPosts }) => ({
  home,
  posts: tagPosts,
})

export default connect(
  mapStateToProps,
  { ...tagActions }
)(withRouter(HashTagFeed))

HashTagFeed.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  followTag: PropTypes.func.isRequired,
  unfollowTag: PropTypes.func.isRequired,
  fetchTagPosts: PropTypes.func.isRequired,
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 580px;
`
