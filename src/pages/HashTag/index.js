import React, { useEffect } from 'react'
import { fetchTagPosts } from './store/tagActions'
import { RESET_TAG_POSTS } from './store/tagActionTypes'
import { createCollection } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Feed from '../../components/feed'

const HashTagFeed = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.fetchTagPosts(props.match.params.tag)
    return () => dispatch({ type: RESET_TAG_POSTS })
  }, [])
  return (
    <div>
      <h1>{props.match.params.tag}</h1>
      <Feed
        user={props.user}
        posts={props.posts.posts}
        auth={props.auth}
        createCollection={props.createCollection}
      />
    </div>
  )
}

const mapStateToProps = ({ tagPosts, user, auth }) => ({
  posts: tagPosts,
  user: { ...auth, ...user },
  auth,
})

export default connect(
  mapStateToProps,
  {
    fetchTagPosts,
    createCollection,
  }
)(withRouter(HashTagFeed))
