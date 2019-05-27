import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import styled from 'styled-components'
import { customWrapper } from '../mixins'
import { baseURL } from 'services'
import ContentLoader from 'react-content-loader'
import HelpScreen from '../utils/screens/HelpScreen'
import OnlineFriendsSVG from 'assets/svg/online_friends.svg'
import PostContainer from './posts/index'
import { StyledFeed } from './StyledFeed'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor='#c2c2c2'
    secondaryColor='#ecebeb'
    style={{ minWidth: '100%', maxWidth: '700px', width: '100%' }}
  >
    <circle cx='30' cy='30' r='30' />
    <rect x='75' y='13' rx='4' ry='4' width='100' height='13' />
    <rect x='75' y='37' rx='4' ry='4' width='50' height='8' />
    <rect x='3' y='68' rx='5' ry='5' width='400' height='400' />
  </ContentLoader>
)
class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentValue: '',
    }
    // connect socket
    this.socket = openSocket(baseURL)
  }

  componentDidMount() {
    // on CDM socket will emit to all other sockets online that this user connected
    this.socket.emit('join', { user_id: this.props.auth.id })

    // join namespace contains all the current users who are online
    this.socket.on('join', data => {
      this.props.fetchNotifications(data)
    })

    // socket is listening on comments event & will receive an obj
    this.socket.on('comments', msg => {
      // msg obj contains properties of content, action, post_id, user_id, username, created_at, & updated_at

      switch (msg.action) {
        // when action type === destroy
        case 'destroy':
          // invoke action creator deleteComment & pass in msg obj
          this.props.deleteComment(msg)
          break
        // when action type === create
        case 'create':
          // invoke action creator createComment & pass in msg obj
          this.props.createComment(msg)
          break
        default:
          break
      }
    })
    // socket is listening on like event & will receive an obj
    this.socket.on('like', data => {
      // obj contains postOwnerId, post_id, user_id, username
      // console.log('in like socket connection', data)
      switch (data.action) {
        case 'unlike':
          // invoke action creator unlikeComment & pass in msg obj
          this.props.unlikeComment(data)
          break
        case 'like':
          // invoke action creator likeComment & pass in msg obj
          this.props.likeComment(data)
        default:
          break
      }
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  handleSubmit = (event, post_id, comment, postOwnerId) => {
    const body = comment.trim()
    if (body) {
      const comment = {
        action: 'create',
        content: body,
        user_id: this.props.auth.id,
        post_id: post_id,
        username: this.props.user.username,
        postOwnerId,
      }
      this.socket.emit('comments', comment)
    }
  }

  handleDeleteComment = (comment_id, post_id) => {
    this.socket.emit('comments', {
      action: 'destroy',
      comment_id: comment_id,
      post_id: post_id,
    })
  }

  handleClick = data => {
    this.socket.emit('like', data)
  }

  render() {
    while (!this.props.user) {
      return (
        <Container>
          <MyLoader />
        </Container>
      )
    }
    const search = this.props.searchTerm
    const filteredPosts = this.props.posts.filter((post, index) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.thumbnail_url.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.username.toLowerCase().includes(search.toLowerCase())
      )
    })

    let posts = []

    posts = filteredPosts.map((post, index) => (
      <PostContainer
        key={index}
        handleSubmit={this.handleSubmit}
        handleClick={this.handleClick}
        post={post}
        user_id={this.props.auth.id}
        username={this.props.user.username}
        profile_picture={this.props.user.profilePicture}
        handleDeleteComment={this.handleDeleteComment}
        socketId={this.socket.id}
        createCollection={this.props.createCollection}
      />
    ))

    if (this.props.posts.length) {
      return (
        <Container>
          <InfiniteScroll
            dataLength={this.props.posts.length}
            next={() => this.props.fetchMoreFeed(this.props.offset)}
            hasMore={this.props.hasmore}
            loader={<Loading style={{ margin: 'auto', display: 'block' }} />}
          >
            {posts}
          </InfiniteScroll>
        </Container>
      )
    } else {
      return (
        <Container>
          <HelpScreen
            headerText='Hello! Follow your friends and share your posts with them.'
            imgSource={OnlineFriendsSVG}
          />
        </Container>
      )
    }
  }
}

export default Feed

const Container = styled.div`
  ${customWrapper('100%', '0 auto')}
  ${StyledFeed}
`
