import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import NoPostScreen from '../utils/screens/NoPostScreen';
import HelpScreen from '../utils/screens/HelpScreen';
import LoveItSVG from '../../assets/svg/love-it-drawing.svg';

import { truncateText } from '../mixins';
import { Wrapper, Post } from '../../pages/profile/Bookmarks';
import { getlikedPosts } from '../../actions';
// This is the reccomended component now

class Likes extends Component {
  componentDidMount = () => this.props.getlikedPosts();

  handleTruncateText = (content, limit = 10) => {
    return truncateText(content, limit);
  };

  render() {
    let path = this.props.location.pathname;
    let likedPostsById = [];
    let likedPosts = [];

    if (path.includes('profile')) {
      // Filter liked posts by id
      likedPostsById = this.props.likedPosts.filter(
        post => post.user_id === Number(this.props.match.params.id)
      );

      // If user doesn't have liked posts
      if (likedPostsById.length === 0) {
        return (
          <NoPostScreen textDescription="No courses or articles have been recommended yet." />
        );
      }

      likedPosts = this.props.likedPostsById
        .map(post => (
          <SinglePost
            key={post.id}
            post={post}
            handleTruncateText={this.handleTruncateText}
          />
        ))
        .reverse();
    } else {
      likedPosts = this.props.likedPosts
        .map(post => (
          <SinglePost
            key={post.id}
            post={post}
            handleTruncateText={this.handleTruncateText}
          />
        ))
        .reverse();
    }

    if (likedPosts.length === 0 && path.includes('profile')) {
      return (
        <NoPostScreen textDescription="No courses or articles have been recommended yet." />
      );
    } else if (likedPosts.length === 0) {
      return (
        <HelpScreen
          imgSource={LoveItSVG}
          headerText="Your recommended courses and articles will be stored here."
        />
      );
    } else {
      return <Wrapper>{likedPosts}</Wrapper>;
    }
  }
}

// Extracted single post in a stateless component
const SinglePost = ({ post, handleTruncateText }) => {
  return (
    <Post key={post.id}>
      <a href={post.post_url} target="_blank" rel="noopener noreferrer">
        <img src={post.thumbnail_url} alt="" />
      </a>
      <div className="post-content">
        <a href={post.post_url} target="_blank" rel="noopener noreferrer">
          <h1>{handleTruncateText(post.title)}</h1>
        </a>
        <p>{handleTruncateText(post.description, 15)}</p>
        <div className="date-like-heart">
          <span className="formatted-date">
            Added <Moment fromNow>{post.created_at}</Moment>
          </span>
        </div>
      </div>
    </Post>
  );
};

const mapStateToProps = ({ likedPosts }) => ({ likedPosts });

export default withRouter(
  connect(
    mapStateToProps,
    { getlikedPosts }
  )(Likes)
);
