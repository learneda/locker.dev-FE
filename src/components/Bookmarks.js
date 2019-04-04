import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPosts, deletePost,getSearchValue } from '../actions';
import Toggle from '../components/Toggle';
import Like from '../components/Like';
import Moment from 'react-moment';
import axios from 'axios';
import { post as URL } from '../services/baseURL';
import deleteIcon from '../assets/svg/delete-icon.svg';

import { customWrapper } from '../components/mixins';

class Bookmarks extends Component {
  componentDidMount = () => this.props.getPosts();

  handleLike = async (id, liked) => {
    await axios.put(`${URL}/api/posts/like/${id}`, { status: !liked });
    this.props.getPosts();
  };

  render() {
    console.log('this is props sammy', this.props);

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
      max-height: 204px;
      &:hover {
        .like {
          opacity: 1;
          transition: 200ms ease-in;
        }
        .delete-icon {
          opacity: 1;
          transition: 200ms ease-in;
        }
      }
      @media (max-width: 960px) {
        flex-direction: column;
        align-items: center;
        max-height: initial;
      }
      .delete-icon {
        // color: red;
        // right: 20px;
        // font-size: 4rem;
        cursor: pointer;
        opacity: 0;
        // transition: 200ms ease-out;
        width: 24px;
        height: 24px;
      }
      .like {
        display: inline;
        // right: 40px;
        // top: 0px;
        cursor: pointer;
        transition: 200ms ease-out;
        margin-right: 20px;
        opacity: 0;
      }
      a {
        text-decoration: none;
        color: #444;
      }
      .post-content {
        margin: 0 5px;
        padding: 15px;
      }

      img {
        width: 100%;
        border-radius: 6px;
        max-width: 320px;
        max-height: 204px;
        height: 204px;
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
        // display: inline-block;
        // margin-bottom: 5px;
        position: relative;
        margin-right: 30px;
      }
      .date-like-heart {
        display: flex;
        // align-items: center;
      }
    `;

        const search = this.props.search_term

          const filteredPosts = this.props.posts.filter((post) => {
        return (
          post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          post.thumbnail_url.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      })
    
    return (
      <Wrapper>
        <Toggle />
        {filteredPosts
          .map(post => (
            <Post key={post.id}>
              <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                <img src={post.thumbnail_url} alt="" />
              </a>
              <div className="post-content">
                <a
                  href={post.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1>{post.title}</h1>
                </a>
                <p>{post.description}</p>
                <div className="date-like-heart">
                  <span className="formatted-date">
                    Added <Moment fromNow>{post.created_at}</Moment>
                  </span>
                  <Like
                    liked={post.liked}
                    handleLike={this.handleLike}
                    id={post.id}
                  />
                  <img
                    src={deleteIcon}
                    className="delete-icon"
                    onClick={async () =>
                      await this.props
                        .deletePost(post.id)
                        .then(res => this.props.getPosts())
                    }
                  />
                </div>
              </div>
            </Post>
          ))
          .reverse()}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    deletePost: state.deletePost,
    search_term: state.search_term
  };
};

export default connect(
  mapStateToProps,
  { getPosts, deletePost, getSearchValue }
)(Bookmarks);
