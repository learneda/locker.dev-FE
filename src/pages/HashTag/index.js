import React, { useEffect } from 'react'
import { fetchTagPosts } from './store/tagActions'
import { createCollection } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Feed from '../../components/feed'

const HashTagFeed = props => {
  useEffect(() => {
    props.fetchTagPosts(props.match.params.tag)
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
