import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { editModalDisplay, editPostSubmit, getPosts } from '../actions/index';

class EditModal extends Component {
  state = {
    description: '',
    post_url: '',
    title: ''
  };

  componentDidMount() {
    if (this.props.editFormData) {
      this.setState({
        description: this.props.editFormData.post.description,
        post_url: this.props.editFormData.post.post_url,
        title: this.props.editFormData.post.title,
        post_id: this.props.editFormData.post.id
      });
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    const editedPost = {
      post_url: this.state.post_url,
      description: this.state.description,
      title: this.state.title
    };

    await this.props
      .editPostSubmit(editedPost, this.state.post_id)
      .then(res => {
        this.props.editModalDisplay();
        this.props.getPosts();
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <StyledEditModal
        style={{
          display: this.props.modalOpen ? 'block' : 'none'
        }}
      >
        <form className="edit-form" onSubmit={this.onSubmit}>
          <span onClick={this.props.editModalDisplay} className="close-modal-x">
            &times;
          </span>
          <div className="form-title">
            <h3>Edit Post</h3>
          </div>
          <label htmlFor="Post Url">Post Url</label>
          <input
            type="text"
            value={this.state.post_url}
            name="post_url"
            onChange={this.onChange}
          />
          <label htmlFor="Post Url">Post Title</label>
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.onChange}
          />
          <label htmlFor="Post Description">Post Description</label>
          <textarea
            name="description"
            id="post-description"
            cols="30"
            rows="10"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <input type="submit" id="edit-submit" value="Update Post" />
        </form>
      </StyledEditModal>
    );
  }
}

const StyledEditModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20000;
  .close-modal-x {
    position: absolute;
    top: 10px;
    right: -70px;
    color: red;
    font-size: 6rem;
    cursor: pointer;
    opacity: 0.5;
    transition: 200ms ease-out;
    &:hover {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }
  .edit-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 700px;
    margin: auto;
    margin-top: 10%;
    color: #444;
    // border: 1px solid red;
    background: #fff;
    padding-bottom: 10px;
    border-radius: 15px;
    position: relative;
  }
  .edit-form input,
  .edit-form label,
  #post-description {
    width: 95%;
    margin: auto;
    border-radius: 6px;
  }
  .edit-form input {
    border: none;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 1.6rem;
    border: 1px solid lightgrey;
    &:focus {
      outline: none;
    }
  }
  #edit-submit {
    background: #4163f2;
    border: none;
    color: #fff;
    padding: 10px 5px;
    border-radius: 6px;
    margin: 10px auto;
    font-size: 1.8rem;
    cursor: pointer;
  }
  .edit-form label {
    margin-bottom: 3px;
    font-size: 1.6rem;
  }
  .form-title {
    text-align: center;
    background: #4163f2;
    color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    h3 {
      font-size: 2.1rem;
    }
  }
  #post-description {
    margin-bottom: 10px;
    resize: none;
    padding: 10px;
    font-size: 1.6rem;
    font-family: inherit;
    border: 1px solid lightgrey;
    &:focus {
      outline: none;
    }
  }
`;

const mapStateToProps = state => {
  return {
    modalOpen: state.modalState.editModalOpen,
    editFormData: state.modalState.editFormData
  };
};
export default connect(
  mapStateToProps,
  { editModalDisplay, editPostSubmit, getPosts }
)(EditModal);
