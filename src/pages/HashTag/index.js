import React, { useEffect } from 'react'
import { fetchTagPosts } from './store/tagActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const HashTagFeed = props => {
  useEffect(() => {
    props.fetchTagPosts(props.match.params.tag)
  }, [])
  return <h1>YOU will see some post with this tag on it</h1>
}

const mapStateToProps = ({ tagPosts }) => ({ posts: tagPosts })

export default connect(
  mapStateToProps,
  {
    fetchTagPosts,
  }
)(withRouter(HashTagFeed))
