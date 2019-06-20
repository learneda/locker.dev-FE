import React, { Component } from 'react'
import CommentBox from '../comments'
import styled from 'styled-components'
import addIcon from 'assets/svg/add-icon.svg'
import { withAlert } from 'react-alert'
import { smartTruncate } from 'components/mixins/'
import PonySVG from 'assets/react-svg/PonySVG'
import CommentSVG from 'assets/react-svg/CommentSVG'
import MoreSVG from 'assets/react-svg/MoreSVG'
import CardActionBar from 'pages/Browse/components/CardActionBar'
import PostHeader from './PostHeader'
class PostContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      activeComment: false,
    }
    this.heartIcon = React.createRef()
    this.pony = React.createRef()
    this.inputCommentRef = React.createRef()
  }

  // componentDidMount() {
  //   if (this.props.post) {
  //     if (this.props.post.hasLiked) {
  //       this.heartIcon.current.setAttribute(
  //         'class',
  //         'far fa-heart fa-lg heart-red'
  //       )
  //     }
  //     if (this.props.post.hasPony) {
  //       console.log('inside did mount has Pony')
  //       this.pony.current.setAttribute('class', 'on')
  //       this.setState({ active: true })
  //     }
  //   }
  // }

  handleLikes = (e, post_id, post) => {
    const postOwnerId = post.user_id

    let result = e.target.classList.contains('heart-red')
    if (result) {
      const data = {
        id: post_id,
        user_id: this.props.user_id,
        action: 'unlike',
      }
      console.log('this is the like data', data)
      this.props.handleClick(data)
    } else {
      const data = {
        id: post_id,
        user_id: this.props.user_id,
        action: 'like',
        postOwnerId,
        username: this.props.username,
      }
      console.log('this is the like data', data)

      this.props.handleClick(data)
    }
  }

  handlePonyClick = (e, post_id, post) => {
    const postOwnerId = post.user_id
    let hasClassName = this.state.active
    if (!hasClassName) {
      const data = {
        id: post_id,
        user_id: this.props.user_id,
        action: 'pony_down',
      }
      this.props.handlePony(data)
    } else {
      const data = {
        id: post_id,
        user_id: this.props.user_id,
        action: 'pony_up',
        postOwnerId,
        username: this.props.username,
      }
      this.props.handlePony(data)
    }
  }

  handleSaveToProfile = post => {
    const { title, url, description, thumbnail_url } = post
    this.props.createCollection({
      title,
      description,
      thumbnail_url,
      post_url: url,
      type: 'link',
    })
  }

  handleCommentClick = ref => {
    ref.current.focus()
    this.setState({ activeComment: true })
  }
  displayMedia = post => {
    const { url, thumbnail_url } = post
    if (url && url.includes('youtube.com/watch')) {
      const videoId = url.split('=')[1]
      return (
        <div
          style={{
            overflow: 'hidden',
            paddingTop: '56.25%',
            position: 'relative',
          }}
        >
          <iframe
            style={{
              border: '0px',
              height: '100%',
              left: '0px',
              position: 'absolute',
              top: '0px',
              width: '100%',
            }}
            frameBorder='0'
            width='560'
            height='315'
            title={videoId}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )
    } else if (
      thumbnail_url.includes('google') ||
      thumbnail_url.includes('cloudfront')
    ) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className='post-hero'
            style={{
              overflow: 'hidden',
              height: '350px',
              position: 'relative',
              backgroundImage: `url(${thumbnail_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `blur(1.5rem)`,
            }}
          />
          <div
            style={{
              overflow: 'hidden',
              height: '170px',
              width: '100%',
              position: 'absolute',
              top: '90px',
              justifySelf: 'center',
              backgroundImage: `url(${thumbnail_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              transform: `scale(1.3)`,
            }}
          />
        </div>
      )
    } else {
      return (
        <div
          style={{
            overflow: 'hidden',
            paddingTop: '56.25%',
            position: 'relative',
            backgroundImage: `url(${thumbnail_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )
    }
  }

  render() {
    const {
      className,
      post,
      handleSubmit,
      handleClick,
      profile_picture,
      user_id,
      handleDeleteComment,
    } = this.props
    return (
      <Container>
        <PostHeader post={post} />
        <div className='post-cover'>
          {post.thumbnail_url ? (
            <a href={post.url} target='_blank' rel='noopener noreferrer'>
              {this.displayMedia(post)}
            </a>
          ) : null}
        </div>
        {/* <CommentBox
          post_comments={post.comments}
          post_id={post.id}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          profile_picture={profile_picture}
          handleDeleteComment={handleDeleteComment}
          user_id={user_id}
          postOwnerId={post.user_id}
        /> */}
      </Container>
    )
  }
}

const Post = withAlert()(PostContainer)

export default Post

const Container = styled.div`
  position: relative;
  overflow: hidden;
`
