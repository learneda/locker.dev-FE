import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import styled from 'styled-components';

import { customWrapper, truncateText } from '../mixins';
import { StyledBookmarks } from './StyledBookmarks';
import EditModal from '../utils/EditModal/EditModal';
import {
  getPosts,
  deletePost,
  editModalDisplay,
  editPostGetDefaultData,
  getSearchValue,
  getUserProfileDetails,
} from '../../actions';
import deleteIcon from '../../assets/svg/delete-icon.svg';
import editSvg from '../../assets/svg/edit.svg';
import HelpScreen from '../utils/screens/HelpScreen';
import BookmarkSVG from '../../assets/svg/bookmark-drawing.svg';
import SharedButton from '../shared';

const Bookmarks = props => {
  const { getPosts } = props;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // const handleLike = async (id, liked) => {
  //   await axios.put(`${URL}/api/posts/like/${id}`, { status: !liked });
  //   props.getPosts();
  // };

  const handleTruncateText = (content, limit = 10) =>
    truncateText(content, limit);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const search = props.search_term;
  const filteredPosts = props.posts.filter(post => {
    return post.title
      ? post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
      : null || post.thumbnail_url
      ? post.thumbnail_url.toLowerCase().indexOf(search.toLowerCase()) !== -1
      : null || post.description
      ? post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
      : null;
  });

  const handleDelete = async postId => {
    await props.deletePost(postId);
    props.getPosts();
    props.getUserProfileDetails(props.userId);
  };
  const posts = filteredPosts
    .map(post => (
      <Post key={post.id}>
        <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
          <img src={post.thumbnail_url} alt='' />
        </a>
        <div className='post-content'>
          <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
            <h1>{handleTruncateText(post.title, 9)}</h1>
          </a>
          <p>{handleTruncateText(post.description, 15)}</p>
          <div className='date-like-heart'>
            <span className='formatted-date'>
              Added <Moment fromNow>{post.created_at}</Moment>
            </span>
            <SharedButton bookmark={post} />
            <div
              className='delete-bookmark'
              onClick={() => handleDelete(post.id)}
            >
              <img src={deleteIcon} className='delete-icon' alt='delete icon' />
              <span className='del-span'>Delete</span>
            </div>
          </div>
          <div className='edit-icon'>
            <img
              src={editSvg}
              alt=''
              onClick={() => {
                localStorage.setItem('editPostId', post.id);
                handleModalOpen();
              }}
            />
          </div>
        </div>
      </Post>
    ))
    .reverse();

  if (posts.length === 0) {
    return (
      <HelpScreen
        imgSource={BookmarkSVG}
        headerText='Your saved courses and articles will be stored here.'
      />
    );
  }
  return (
    <Wrapper>
      <EditModal
        key={localStorage.getItem('editPostId')}
        open={modalOpen}
        handleModalOpen={handleModalOpen}
      />
      {posts}
    </Wrapper>
  );
};

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
    userId: state.auth.id,
    posts: state.posts,
    deletePost: state.deletePost,
    search_term: state.search_term,
    modalOpen: state.modal.isEditOpen,
    editFormData: state.modal.editFormData,
  };
};

export default connect(
  mapStateToProps,
  {
    getPosts,
    deletePost,
    editModalDisplay,
    editPostGetDefaultData,
    getSearchValue,
    getUserProfileDetails,
  }
)(Bookmarks);
