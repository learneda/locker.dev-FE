import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
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
    const likedPosts = this.props.likedPosts
      .map(post => (
        <Post key={post.id}>
          <a href={post.post_url} target="_blank" rel="noopener noreferrer">
            <img src={post.thumbnail_url} alt="" />
          </a>
          <div>
            <a href={post.post_url} target="_blank" rel="noopener noreferrer">
              <h1>{this.handleTruncateText(post.title)}</h1>
            </a>
            <p>{this.handleTruncateText(post.description, 15)}</p>
            <span className="formatted-date">
              Added <Moment fromNow>{post.created_at}</Moment>
            </span>
          </div>
        </Post>
      ))
      .reverse();

    let path = this.props.location.pathname;
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

const mapStateToProps = ({ likedPosts }) => ({ likedPosts });

export default withRouter(
  connect(
    mapStateToProps,
    { getlikedPosts }
  )(Likes)
);
