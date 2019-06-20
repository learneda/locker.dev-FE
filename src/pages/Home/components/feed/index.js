import React from 'react'
import socket from 'socket'
import styled from 'styled-components'
import HelpScreen from 'components/utils/screens/HelpScreen'
import OnlineFriendsSVG from 'assets/svg/online_friends.svg'
import PostContainer from './posts/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import FeedPlaceholder from '../FeedPlaceholder'

const Feed = props => {
  const {
    auth,
    user,
    posts,
    offset,
    hasmore,
    fetchMoreFeed,
    createCollection,
  } = props

  const handleSubmit = (event, post_id, comment, postOwnerId) => {
    const body = comment.trim()
    if (body) {
      const comment = {
        action: 'create',
        content: body,
        user_id: auth.id,
        post_id: post_id,
        username: user.username,
        postOwnerId,
      }
      socket.emit('comments', comment)
    }
  }

  const handleDeleteComment = (comment_id, post_id) => {
    socket.emit('comments', {
      action: 'destroy',
      comment_id: comment_id,
      post_id: post_id,
    })
  }

  const handleClick = data => {
    socket.emit('like', data)
  }

  const handlePony = data => {
    socket.emit('pony', data)
  }

  const next = () => fetchMoreFeed(offset)

  return (
    <Container>
      <ScrollToTopOnMount />
      <InfiniteScroll
        className='infinite-scroll'
        dataLength={posts.length}
        next={next}
        hasMore={hasmore}
        loader={
          <Container>
            <FeedPlaceholder />
          </Container>
        }
        endMessage={
          <Container>
            <HelpScreen
              headerText='We reached the end of your feed!'
              imgSource={OnlineFriendsSVG}
            />
          </Container>
        }
      >
        {posts.map((post, index) => (
          <PostContainer
            key={index}
            handleSubmit={handleSubmit}
            handleClick={handleClick}
            post={post}
            user_id={auth.id}
            username={user.username}
            profile_picture={user.profile_picture}
            handleDeleteComment={handleDeleteComment}
            socketId={socket.id}
            createCollection={createCollection}
            handlePony={handlePony}
          />
        ))}
      </InfiniteScroll>
    </Container>
  )
}

export default Feed

const Container = styled.div`
  /* border: 1px solid red; */
  max-width: 580px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: #fff;
  .infinite-scroll {
    /* border: 1px solid blue; */
  }
`
