import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import Feed from 'containers/Feed/index'
import { createCollection } from 'actions'

const SinglePost = props => {
  const { match, user, auth, createCollection } = props
  const [post, setPost] = useState([])
  useEffect(() => {
    axios.get(`/newsfeed/${match.params.id}`).then(res => {
      setPost([res.data.post])
    })
  }, [post])
  return (
    <Container>
      <Feed
        posts={post}
        user={user}
        auth={auth}
        createCollection={createCollection}
      />
    </Container>
  )
}
const mapStateToProps = ({ user, auth }) => ({
  user: { ...auth, ...user },
  auth,
})

export default connect(
  mapStateToProps,
  { createCollection }
)(withRouter(SinglePost))

SinglePost.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.any,
  createCollection: PropTypes.func.isRequired,
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`
