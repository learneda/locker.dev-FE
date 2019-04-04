import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getlikedPosts } from '../actions';
import styled from 'styled-components';
import Moment from 'react-moment';
import { customWrapper } from '../components/mixins';
// This is the reccomended component now
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
  max-height: 204px;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
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
    width: 100%;
    border-radius: 6px;
    max-width: 320px;
    max-height: 204px;
    object-fit: fill;
    height: 100%;
    @media (max-width: 960px) {
      max-width: 100%;
      max-height: 400px;
      border-radius: 6px;
      border-radius: 0 0 6px 6px;
    }
  }
  p {
    max-width: 600px;
    margin: 10px auto;
    font-size: 1.6rem;
    text-align: justify;
    word-break: break-all;
    line-height: 1.5;
  }
  h1 {
    margin: 10px auto;
    font-size: 2.6rem;
    max-width: 600px;
  }
  .formatted-date {
    font-size: 1.2rem;
    opacity: 0.8;
    position: relative;
    margin-right: 30px;
  }
`;

class Likes extends Component {
  componentDidMount = () => this.props.getlikedPosts();

  render() {
    return (
      <Wrapper>
        {this.props.likedPosts
          .map(post => (
            <Post key={post.id}>
              <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                <img src={post.thumbnail_url} alt="" />
              </a>
              <div>
                <a
                  href={post.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1>{post.title}</h1>
                </a>
                <p>{post.description}</p>
                <span className="formatted-date">
                  Added <Moment fromNow>{post.created_at}</Moment>
                </span>
              </div>
            </Post>
          ))
          .reverse()}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ likedPosts }) => ({ likedPosts });

export default connect(
  mapStateToProps,
  { getlikedPosts }
)(Likes);
