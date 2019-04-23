import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { post as URL } from '../../../services/baseURL';
import { StyledEditModal } from './StyledEditModal';
import styled from 'styled-components';
import { editModalDisplay, editPostSubmit, getPosts } from '../../../actions';

const Wrapper = styled.div`
  ${StyledEditModal}
`;

const EditModal = props => {
  const [description, setDescription] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('editPostId');
    if (id) {
      axios.get(`${URL}/api/posts/${id}`).then(res => {
        const { post } = res.data;
        setDescription(post.description);
        setTitle(post.title);
        setPostUrl(post.post_url);
        setPostId(post.id);
      });
    }
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const id = postId;
    const editedPost = {
      post_url: postUrl,
      description: description,
      title: title
    };
    axios
      .put(`${URL}/api/posts/${id}`, editedPost)
      .then(res => props.getPosts(), props.handleModalOpen());
  };

  return (
    <Wrapper
      style={{
        display: props.open ? 'block' : 'none'
      }}
    >
      <form className="edit-form" onSubmit={onSubmit}>
        <span onClick={props.handleModalOpen} className="close-modal-x">
          &times;
        </span>
        <div className="form-title">
          <h3>Edit Post</h3>
        </div>
        <label htmlFor="Post Url">Post Title</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="Post Url">Post Url</label>
        <input
          type="text"
          value={postUrl}
          name="post_url"
          onChange={e => setPostUrl(e.target.value)}
        />
        <label htmlFor="Post Description">Post Description</label>
        <textarea
          name="description"
          id="post-description"
          cols="30"
          rows="10"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type="submit" id="edit-submit" value="Update Post" />
      </form>
    </Wrapper>
  );
};

export default connect(
  null,
  { editModalDisplay, editPostSubmit, getPosts }
)(EditModal);
