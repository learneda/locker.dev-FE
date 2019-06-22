import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as tagActions from './store/tagActions'
import { createCollection } from 'actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'pages/Home/components/feed/'

const HashTagFeed = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    props.fetchTagPosts(props.match.params.tag, 0)
    window.scrollTo(0, 0)
    return () => {
      dispatch({ type: 'RESET_POSTS' })
      dispatch({ type: ' RESET_TAG_POSTS' })
    }
  }, [props.history.location.pathname])
  return (
    <Container>
      <Flex>
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
          {props.posts.isFollowing ? '✔ Following' : '+ Follow'}
        </div>
      </Flex>
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

const Flex = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  background: white;
  justify-content: center;
  align-items: center;
  height: 70px;
  z-index: 1;
  border: 1px solid dodgerblue;
  margin-bottom: 20px;
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 20px;
  }
  div {
    font-size: 1.6rem;
    margin: 0 20px;
    width: 100px;
    display: flex;
    justify-content: center;
  }
`
