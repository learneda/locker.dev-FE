import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import CommentBox from '../comments'
import axios from 'axios'
import { post as URL } from '../../../services/baseURL'
import addIcon from '../../../assets/svg/add-icon.svg'
import { withAlert } from 'react-alert'
import { smartTruncate } from '../../mixins/'
import { selectLogo } from '../../../helpers'
class PostContainer extends Component {
  constructor(props) {
    super(props)
    this.heartIcon = React.createRef()
  }

  componentDidMount() {
    if (this.props.post) {
      axios
        .post(`${URL}/api/posts/like/users`, {
          post_id: this.props.post.post_id,
        })
        .then(res => {
          res.data.forEach(post => {
            if (post.user_id === this.props.user_id) {
              this.heartIcon.current.setAttribute(
                'class',
                'far fa-heart fa-lg heart-red'
              )
            }
          })
        })
        .catch(err => console.log(err))
    }
  }

  handleLikes = (e, post_id, post) => {
    const postOwnerId = post.user_id

    let result = e.target.classList.contains('heart-red')
    if (result) {
      const data = {
        post_id,
        user_id: this.props.user_id,
        action: 'unlike',
      }
      this.props.handleClick(data)
    } else {
      const data = {
        post_id,
        user_id: this.props.user_id,
        action: 'like',
        postOwnerId,
        username: this.props.username,
      }
      this.props.handleClick(data)
    }
  }
  handleSaveToProfile = url => {
    axios.post(`${URL}/api/posts`, { post_url: url, id: this.props.user_id })
  }

  displayMedia = post => {
    const { post_url, thumbnail_url } = post
    if (post_url.includes('youtube.com/watch')) {
      const videoId = post_url.split('=')[1]
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
          {/* <div>{this.props.post.user_thoughts}</div> */}
        </div>
        <div className='post-content'>
          {post.thumbnail_url ? (
            <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
              {this.displayMedia(post)}
            </a>
          ) : null}
          <div className='title-and-description'>
            <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
              <h2>{post.title}</h2>
            </a>
            <p>{smartTruncate(post.description, 210)}</p>
            <a
              className='post-root-url'
              href={post.post_url}
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
                {selectLogo(post.post_url)}
                <span style={{ marginLeft: '5px' }}>
                  {post.post_url.includes('book') ? 'google.com' : null}
                </span>
                <span style={{ marginLeft: '5px' }}>
                  {post.post_url.includes('youtube') ? 'youtube.com' : null}
                </span>
                {post.root_url === 'youtube.com' ? null : (
                  <span style={{ marginLeft: '-5px' }}>{post.root_url}</span>
                )}
              </div>
            </a>
          </div>
          <div className='likes-and-save'>
            <i
              className='far fa-heart fa-lg'
              ref={this.heartIcon}
              onClick={e => {
                this.handleLikes(e, post.post_id, post)
                e.target.classList.toggle('heart-red')
              }}
            >
              <span>{this.props.post.likes}</span>
            </i>
            {this.props.user_id !== post.user_id && (
              <div
                className='save'
                onClick={() => {
                  this.handleSaveToProfile(post.post_url)
                  this.props.alert.success('Post added to Bookmarks')
                }}
              >
                <img src={addIcon} alt='' />
                <h3>Save to Bookmarks</h3>
              </div>
            )}
          </div>
        </div>
        <CommentBox
          post_comments={post.comments}
          post_id={post.post_id}
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
