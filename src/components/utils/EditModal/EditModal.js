import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { post as URL } from '../../../services/baseURL';
import { StyledEditModal } from './StyledEditModal';
import styled from 'styled-components';
import { getPosts } from '../../../actions';
import deleteIcon from '../../../assets/svg/delete-icon.svg';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  ${StyledEditModal}
`;

const EditModal = props => {
  const [description, setDescription] = useState(props.post.description);
  const [postUrl, setPostUrl] = useState(props.post.post_url);
  const [title, setTitle] = useState(props.post.title);

  useLockBodyScroll();

  const onSubmit = async e => {
    e.preventDefault();
    const { id } = props.post;
    const editedPost = {
      post_url: postUrl,
      description,
      title,
    };
    axios
      .put(`${URL}/api/posts/${id}`, editedPost)
      .then(res => props.getPosts(), props.handleModalOpen());
  };

  return (
    <Wrapper
      style={{
        display: props.open ? 'block' : 'none',
      }}
    >
      <form className='edit-form' onSubmit={onSubmit}>
        <span onClick={props.handleModalOpen} className='close-modal-x'>
          <img src={deleteIcon} alt='' />
        </span>
        <div className='form-title'>
          <h3>Edit Post</h3>
        </div>
        <label htmlFor='Post Url'>Post Title</label>
        <input
          type='text'
          value={title}
          name='title'
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor='Post Url'>Post Url</label>
        <input
          type='text'
          value={postUrl}
          name='post_url'
          onChange={e => setPostUrl(e.target.value)}
        />
        <label htmlFor='Post Description'>Post Description</label>
        <textarea
          name='description'
          id='post-description'
          cols='30'
          rows='10'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type='submit' id='edit-submit' value='Update Post' />
      </form>
    </Wrapper>
  );
};

export default connect(
  null,
  { getPosts }
)(EditModal);
