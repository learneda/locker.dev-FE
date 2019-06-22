import React, { useState, useEffect } from 'react'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import Feed from 'pages/Home/components/feed/'
import { createCollection } from 'actions'
import { connect } from 'react-redux'

const SinglePost = props => {
  const [post, setPost] = useState([])
  useEffect(() => {
    console.log(props.match.params.id)
    axios.get(`/newsfeed/${props.match.params.id}`).then(res => {
      console.log('single post response', res.data)
      setPost([res.data.post])
    })
  }, [])
  return (
    <Container>
      <Feed
        posts={post}
        user={props.user}
        auth={props.auth}
        createCollection={props.createCollection}
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

const Container = styled.div`
  display: flex;
  justify-content: center;
`
