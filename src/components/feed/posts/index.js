import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentBox from '../comments';
import axios from 'axios';
import { post as URL } from '../../../services/baseURL';
import addIcon from '../../../assets/svg/add-icon.svg';
import { withAlert } from 'react-alert';

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.heartIcon = React.createRef();
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
              );
            }
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleLikes = (e, post_id) => {
    let result = e.target.classList.contains('heart-red');
    if (result) {
      const data = {
        post_id,
        user_id: this.props.user_id,
        action: 'unlike',
      };
      this.props.handleClick(data);
    } else {
      const data = {
        post_id,
        user_id: this.props.user_id,
        action: 'like',
      };
      this.props.handleClick(data);
    }
  };
  handleSaveToProfile = url => {
    axios.post(`${URL}/api/posts`, { post_url: url, id: this.props.user_id });
  };

  render() {
    const {
      post,
      handleSubmit,
      handleClick,
      getNewsFeed,
      profile_picture,
      user_id,
      handleDeleteComment,
    } = this.props;
    console.log(this.props.user_id !== post.user_id);
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
                  {post.created_at}
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
              <img src={`${post.thumbnail_url}`} alt='post_thumbnail' />
            </a>
          ) : null}
          <div className='title-and-description'>
            <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
              <h2>{post.title}</h2>
            </a>
            <p>{post.description}</p>
          </div>
          <div className='likes-and-save'>
            <i
              className='far fa-heart fa-lg'
              ref={this.heartIcon}
              onClick={e => {
                this.handleLikes(e, post.post_id);
                e.target.classList.toggle('heart-red');
              }}
            >
              <span>{this.props.post.likes}</span>
            </i>
            {this.props.user_id !== post.user_id && (
              <div
                className='save'
                onClick={() => {
                  this.handleSaveToProfile(post.post_url);
                  this.props.alert.success('Post added to Bookmarks');
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
          getNewsFeed={getNewsFeed}
          handleSubmit={handleSubmit}
          profile_picture={profile_picture}
          handleDeleteComment={handleDeleteComment}
          user_id={user_id}
        />
      </div>
    );
  }
}

const Alert = withAlert()(PostContainer);

export default Alert;
