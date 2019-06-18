import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import CommentBox from '../comments'
import { apiURL } from 'services'
import addIcon from 'assets/svg/add-icon.svg'
import { withAlert } from 'react-alert'
import { smartTruncate } from '../../mixins/'
import { selectLogo } from 'helpers'
import axiosAPI from '../../../apis/axiosAPI'
class PostContainer extends Component {
  constructor(props) {
    super(props)
    this.heartIcon = React.createRef()
    this.pony = React.createRef()
  }

  componentDidMount() {
    if (this.props.post) {
      if (this.props.post.hasLiked) {
        this.heartIcon.current.setAttribute(
          'class',
          'far fa-heart fa-lg heart-red'
        )
      }
      if (this.props.post.hasPony) {
        this.pony.current.setAttribute('class', 'on')
      }
    }
  }

  handleLikes = (e, post_id, post) => {
    e.preventDefault()

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
    e.preventDefault()
    const postOwnerId = post.user_id
    let hasClassName = e.target.classList.contains('on')
    if (hasClassName) {
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

  displayMedia = post => {
    const { url, thumbnail_url } = post
    if (url.includes('youtube.com/watch')) {
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
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
      )
    }
  }

  render() {
    const {
      post,
      handleSubmit,
      handleClick,
      profile_picture,
      user_id,
      handleDeleteComment,
    } = this.props
    return (
      <div className='post'>
        <div className='post-user-info'>
          <Link to={`/profile/${post.user_id}`} className='post-user-pic'>
            <img src={`${post.profile_picture}`} alt='user_profile_pic' />
          </Link>
          <div>
            <Link to={`/profile/${post.user_id}`}>
              <h2>
                {post.username}
                <Moment className='post-date' fromNow>
                  {post.posted_at_date}
                </Moment>
              </h2>
            </Link>
            <p className='post-thoughts'>{this.props.post.user_thoughts}</p>
          </div>
        </div>
        <div className='post-content'>
          {post.thumbnail_url ? (
            <a href={post.url} target='_blank' rel='noopener noreferrer'>
              {this.displayMedia(post)}
            </a>
          ) : null}
          <div className='title-and-description'>
            <a href={post.url} target='_blank' rel='noopener noreferrer'>
              <h2>{post.title}</h2>
            </a>
            <p>{smartTruncate(post.description, 210)}</p>
            <a
              className='post-root-url'
              href={post.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div
                style={{
                  display: 'flex',
                  marginTop: '5px',
                  alignItems: 'center',
                }}
              >
                {selectLogo(post.url)}
                <span style={{ marginLeft: '5px' }}>
                  {post.url.includes('book') ? 'google.com' : null}
                </span>
                <span style={{ marginLeft: '5px' }}>
                  {post.url.includes('youtube') ? 'youtube.com' : null}
                </span>
                {post.root_url === 'youtube.com' ? null : (
                  <span style={{ marginLeft: '-5px' }}>{post.root_url}</span>
                )}
              </div>
            </a>
          </div>
          <div className='likes-and-save'>
            <div>
              <i
                className='far fa-heart fa-lg'
                ref={this.heartIcon}
                onClick={e => {
                  e.preventDefault()
                  this.handleLikes(e, post.id, post)
                  e.target.classList.toggle('heart-red')
                }}
              />
              <span className='like_num'>{post.likes}</span>
            </div>
            <div>
              <span
                ref={this.pony}
                onClick={e => {
                  e.preventDefault()
                  this.handlePonyClick(e, post.id, post)
                  e.target.classList.toggle('on')
                }}
              >
                🦄
              </span>
              <span>{post.ponyCount}</span>
            </div>

            {post.tags.length > 0 &&
              post.tags.map(tag => {
                return (
                  <Link to={`tag/${tag.hashtag}`} key={tag.id}>
                    <div style={{ marginLeft: '5px' }}> #{tag.hashtag} </div>
                  </Link>
                )
              })}

            {this.props.user_id !== post.user_id && (
              <div
                className='save'
                onClick={() => {
                  this.handleSaveToProfile(post)
                  this.props.alert.success('Post added to Saved')
                }}
              >
                <img src={addIcon} alt='' />
                <h3>Add to Saved</h3>
              </div>
            )}
          </div>
        </div>
        <CommentBox
          post_comments={post.comments}
          post_id={post.id}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          profile_picture={profile_picture}
          handleDeleteComment={handleDeleteComment}
          user_id={user_id}
          postOwnerId={post.user_id}
        />
      </div>
    )
  }
}

const Alert = withAlert()(PostContainer)

export default Alert
