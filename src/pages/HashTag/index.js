import React, { useEffect } from 'react'
import * as tagActions from './store/tagActions'
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
    window.scrollTo(0, 0)
  }, [props.history.location.pathname])
  return (
    <div>
      <div>
        <h1>{props.match.params.tag}</h1>
        <div
          onClick={() => {
            if (props.posts.isFollowing) {
              props.unfollowTag(props.match.params.tag)
            } else {
              props.followTag(props.match.params.tag)
            }
          }}
        >
          {props.posts.isFollowing ? '✔ following' : '+ follow'}
        </div>
      </div>
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
    ...tagActions,
    createCollection,
  }
)(withRouter(HashTagFeed))
