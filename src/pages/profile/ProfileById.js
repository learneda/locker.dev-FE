import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import styled from 'styled-components';

import { customWrapper, truncateText } from '../../components/mixins';
import { Wrapper, Post } from './Bookmarks';
import Like from '../../components/recommended/Like';
import NoPostScreen from '../../components/utils/screens/NoPostScreen';
import { post as URL } from '../../services/baseURL';
import {
  getPosts,
  deletePost,
  editModalDisplay,
  editPostGetDefaultData,
  getSearchValue
} from '../../actions';

class ProfileById extends Component {
  state = { modalOpen: false, posts: [] };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    axios.get(`${URL}/api/posts/all/${id}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  handleLike = async (id, liked) => {
    await axios.put(`${URL}/api/posts/like/${id}`, { status: !liked });
    this.props.getPosts();
  };

  handleTruncateText = (content, limit = 10) => truncateText(content, limit);

  render() {
    const search = this.props.search_term;

    const filteredPosts = this.state.posts.filter(post => {
      return post.title
        ? post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        : null || post.thumbnail_url
        ? post.thumbnail_url.toLowerCase().indexOf(search.toLowerCase()) !== -1
        : null || post.description
        ? post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        : null;
    });

    const posts = filteredPosts
      .map(post => (
        <Post key={post.id}>
          <a href={post.post_url} target="_blank" rel="noopener noreferrer">
            <img src={post.thumbnail_url} alt="" />
          </a>
          <div className="post-content">
            <a href={post.post_url} target="_blank" rel="noopener noreferrer">
              <h1>{this.handleTruncateText(post.title)}</h1>
            </a>
            <p>{this.handleTruncateText(post.description, 15)}</p>
            <div className="date-like-heart">
              <span className="formatted-date">
                Added <Moment fromNow>{post.created_at}</Moment>
              </span>
              <Like
                liked={post.liked}
                handleLike={this.handleLike}
                id={post.id}
              />
              <span className="rec-span">Save to Profile</span>
              {/* <img
              src={deleteIcon}
              className="delete-icon"
              onClick={async () =>
                await this.props
                  .deletePost(post.id)
                  .then(res => this.props.getPosts())
              }
              alt="delete icon"
            />
            <span className="del-span">delete</span> */}
            </div>
          </div>
          {/* <img
          src={editSvg}
          alt=""
          onClick={async () => {
            await this.props
              .editPostGetDefaultData(post.id)
              .then(res => this.props.editModalDisplay());
          }}
          className="edit-icon"
        /> */}
        </Post>
      ))
      .reverse();

    if (posts.length === 0) {
      return (
        <NoPostScreen textDescription="No courses or articles have been bookmarked yet." />
      );
    } else {
      return <Wrapper>{posts}</Wrapper>;
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    deletePost: state.deletePost,
    search_term: state.search_term,
    modalOpen: state.modalState.editModalOpen,
    editFormData: state.modalState.editFormData
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPosts,
      deletePost,
      editModalDisplay,
      editPostGetDefaultData,
      getSearchValue
    }
  )(ProfileById)
);
