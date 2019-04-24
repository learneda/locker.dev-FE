import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';
import styled from 'styled-components';

import { customWrapper, truncateText } from '../mixins';
import { StyledBookmarks } from './StyledBookmarks';
import Like from '../likes/Like';
import EditModal from '../utils/EditModal/EditModal';
import { post as URL } from '../../services/baseURL';
import {
  getPosts,
  deletePost,
  editModalDisplay,
  editPostGetDefaultData,
  getSearchValue
} from '../../actions';
import deleteIcon from '../../assets/svg/delete-icon.svg';
import editSvg from '../../assets/svg/edit.svg';
import HelpScreen from '../utils/screens/HelpScreen';
import BookmarkSVG from '../../assets/svg/bookmark-drawing.svg';

class Bookmarks extends Component {
  state = { modalOpen: false };

  componentDidMount = () => {
    this.props.getPosts();
  };

  handleLike = async (id, liked) => {
    await axios.put(`${URL}/api/posts/like/${id}`, { status: !liked });
    this.props.getPosts();
  };

  handleTruncateText = (content, limit = 10) => truncateText(content, limit);

  handleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    const search = this.props.search_term;
    const filteredPosts = this.props.posts.filter(post => {
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
              <h1>{this.handleTruncateText(post.title, 9)}</h1>
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
              <span className="rec-span">like</span>
              <img
                src={deleteIcon}
                className="delete-icon"
                onClick={async () =>
                  await this.props
                    .deletePost(post.id)
                    .then(res => this.props.getPosts())
                }
                alt="delete icon"
              />
              <span className="del-span">delete</span>
            </div>
          </div>
          <img
            src={editSvg}
            alt=""
            onClick={() => {
              localStorage.setItem('editPostId', post.id);

              this.setState({
                modalOpen: !this.state.modalOpen
              });
            }}
            className="edit-icon"
          />
        </Post>
      ))
      .reverse();

    if (posts.length === 0) {
      return (
        <HelpScreen
          imgSource={BookmarkSVG}
          headerText="Your saved courses and articles will be stored here."
        />
      );
    }
    return (
      <Wrapper>
        <EditModal
          key={localStorage.getItem('editPostId')}
          open={this.state.modalOpen}
          handleModalOpen={this.handleModalOpen}
        />
        {posts}
      </Wrapper>
    );
  }
}

export const Wrapper = styled.div`
  // border: 1px solid blue;
  ${customWrapper('100%', '0 auto')}
`;

export const Post = styled.div`
  ${customWrapper('100%', 'auto')}
  ${StyledBookmarks}
`;

const mapStateToProps = state => {
  return {
    posts: state.posts,
    deletePost: state.deletePost,
    search_term: state.search_term,
    modalOpen: state.modalState.editModalOpen,
    editFormData: state.modalState.editFormData
  };
};

export default connect(
  mapStateToProps,
  {
    getPosts,
    deletePost,
    editModalDisplay,
    editPostGetDefaultData,
    getSearchValue
  }
)(Bookmarks);
