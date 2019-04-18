import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentBox from '../comments/CommentBox.js';



class PostContainar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.post.likes
    }
  }

  handleLikes = (e, index) => {
    let likes = this.state.likes
    let result = e.target.classList.contains('heart-red')
    if (result) {
      this.setState({
        likes: likes - 1
      })
    } else {
      this.setState({
        likes: likes + 1
      })
    }
  }

  render () {
    const {post, handleSubmit, handleClick, getNewsFeed, profile_picture, user_id} = this.props
    return (
      <div className="post">
          <div className="post-user-info">
            <Link to={`/profile/${post.user_id}`}>
              <img src={`${post.profile_picture}`} alt="user_profile_pic" />
            </Link>
            <div>
              <h2>{post.username}</h2>
              <Moment className="post-date" fromNow>
                {post.created_at}
              </Moment>
            </div>
          </div>
          <div className="post-content">
            {post.thumbnail_url ? (
              <img src={`${post.thumbnail_url}`} alt="post_thumbnail" />
            ) : null}
            <div className="title-and-description">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <i
                  className='far fa-heart fa-lg'
                  onClick={(e) => {
                    this.handleLikes(e, post.post_id)
                    e.target.classList.toggle('heart-red')
                  }}
                >{this.state.likes}</i>
          </div>
          <CommentBox
            post_comments={post.comments}
            post_id={post.post_id}
            handleClick={handleClick}
            getNewsFeed={getNewsFeed}
            handleSubmit={handleSubmit}
            profile_picture={profile_picture}
            user_id={user_id}
          />
        </div>
    )
  }
}

export default PostContainar