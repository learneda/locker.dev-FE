import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import NoPostScreen from '../utils/screens/NoPostScreen';
import HelpScreen from '../utils/screens/HelpScreen';
import LoveItSVG from '../../assets/svg/love-it-drawing.svg';

import { customWrapper, truncateText } from '../mixins';
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

const Wrapper = styled.div`
  // border: 1px solid blue;
  ${customWrapper('100%', '0 auto')}
`;

const Post = styled.div`
  ${customWrapper('100%', 'auto')}
  display: flex;
  margin-bottom: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  background-color: #fff;
  position: relative;
  height: 186px;
  @media (max-width: 1450px) {
    height: 100%;
  }
  @media (max-width: 1250px) {
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: #444;
  }
  div {
    padding: 15px;
    margin: 0 5px;
  }

  img {
    border-radius: 6px 0 0px 6px;
    width: 320px;
    height: 100%;
    object-fit: cover;
    @media (max-width: 1250px) {
      max-width: 100%;
      width: 100%;
      height: 100%;
      max-height: 400px;
      border-radius: 6px 6px 0 0;
    }
  }
  p {
    max-width: 600px;
    margin: 10px auto;
    font-size: 1.6rem;
    word-break: break-word;
    line-height: 1.5;
  }
  h1 {
    margin: 0px auto;
    font-size: 2.6rem;
    max-width: 600px;
    line-height: 1.2;
  }
  .formatted-date {
    font-size: 1.2rem;
    opacity: 0.8;
    position: relative;
    margin-right: 30px;
  }
`;

const mapStateToProps = ({ likedPosts }) => ({ likedPosts });

export default withRouter(
  connect(
    mapStateToProps,
    { getlikedPosts }
  )(Likes)
);
