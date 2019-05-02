import React, { Component } from 'react';
import ReusablePortal from '../utils/ModalPortal';
import { StyledAddLink } from '../utils/StyledAddLink.js';
import styled from 'styled-components';
import { ReactComponent as X } from '../../assets/svg/x.svg';
import axios from 'axios';
import { post as URL } from '../../services/baseURL';
import shareSvg from '../../assets/svg/share.svg';
import { withAlert } from 'react-alert';

class SharedButton extends Component {
  constructor(props) {
    super(props);
    const { post_url, description, title, thumbnail_url } = this.props.bookmark;
    this.state = {
      on: false,
      description: description,
      post_url,
      title,
      thumbnail_url,
      userThoughts: '',
    };
  }

  toggle = () => {
    this.setState(
      {
        on: !this.state.on,
      }
      //   () => {
      //     if (this.state.on) {
      //       document.getElementById('form-key').focus();
      //     }
      //   }
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submitting ...', this.props.bookmark.id);
    const id = this.props.bookmark.id;

    const editedPost = {
      post_url: this.state.post_url,
      description: this.state.description,
      title: this.state.title,
      user_thoughts: this.state.userThoughts,
      shared: true,
    };
    axios.put(`${URL}/api/posts/${id}`, editedPost).then(res => {
      axios
        .post(`${URL}/api/posts/share`, {
          id,
          user_id: this.props.user_id,
        })
        .then(res => {
          console.log(res);
          this.props.alert.success('Post shared to Feed');
          this.setState({ on: false });
        });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className='share-to-feed' onClick={() => this.toggle()}>
          <img src={shareSvg} alt='Share to feed' />
          <span>Share to Feed</span>
        </div>
        {this.state.on && (
          <ReusablePortal>
            <MODALWRAPPER
              className='modal-wrapper'
              onClick={e =>
                e.target.className === 'modal-wrapper' && this.toggle()
              }
            >
              <div className='modal_'>
                <div className='top'>
                  <div className='modal_name'>Share Bookmark</div>
                  <div className='modal_close' onClick={() => this.toggle()}>
                    <X />
                  </div>
                </div>
                <div className='modal_group'>
                  <form onSubmit={this.handleSubmit} className='add_link_form'>
                    <label htmlFor='Post Url'>Post Url</label>
                    <input
                      name='post_url'
                      id='post-description'
                      cols='30'
                      rows='10'
                      value={this.state.post_url}
                      onChange={this.handleChange}
                    />

                    <label htmlFor='Post Url'>Post Title</label>
                    <input
                      name='title'
                      id='post-description'
                      cols='30'
                      rows='10'
                      value={this.state.title}
                      onChange={this.handleChange}
                    />

                    <label htmlFor='Post Description'>Post Description</label>
                    <textarea
                      name='description'
                      id='post-description'
                      cols='30'
                      rows='10'
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                    <label htmlFor='Post Description'>
                      Add your thoughts to this post
                    </label>
                    <textarea
                      name='userThoughts'
                      id='post-description'
                      cols='30'
                      rows='10'
                      value={this.state.userThoughts}
                      onChange={this.handleChange}
                    />

                    <input
                      type='submit'
                      id='edit-submit'
                      value='Share Post to Feed'
                    />
                  </form>
                </div>
              </div>
            </MODALWRAPPER>
          </ReusablePortal>
        )}
      </div>
    );
  }
}

const Alert = withAlert()(SharedButton);

export default Alert;

const MODALWRAPPER = styled.div`
  ${StyledAddLink};
  overflow: auto;
  text-align: left;
  z-index: 20;

  .modal_ {
    margin-top: 2%;
    border-radius: 15px;
    max-width: 700px;
    width: 100%;
  }
  .top {
    background: #3f65f2;
    color: #fff;
    border-radius: 14px 14px 0 0;
  }
  .add_link_form {
    display: flex;
    flex-direction: column;
    text-align: left;
    input,
    label,
    textarea {
      width: 95%;
      margin: auto;
      border-radius: 6px;
    }
    input,
    textarea {
      border: none;
      padding: 10px;
      margin-bottom: 20px;
      font-size: 1.6rem;
      border: 1px solid lightgrey;
      resize: none;
      font-family: Roboto, sans-serif;
    }
    label {
      margin-bottom: 5px;
      font-size: 1.4rem;
      opacity: 0.8;
    }
    #edit-submit {
      background: #3f65f2;
      color: #fff;
      cursor: pointer;
    }
  }
  .modal_name {
    text-align: center;
    width: 100%;
    font-size: 2.3rem;
  }
`;
