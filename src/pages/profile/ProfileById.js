import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import styled from 'styled-components';

import { customWrapper, truncateText } from '../../components/mixins';
import Like from '../../components/recommended/Like';
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

    return (
      <Wrapper>
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

          .reverse()}
      </Wrapper>
    );
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
  max-height: 180px;
  height: 180px;
  position: relative;
  &:hover {
    .like {
      opacity: 1;
      transition: 200ms ease-in;
    }
    .delete-icon {
      opacity: 1;
      transition: 200ms ease-in;
    }
    .rec-span {
      transition: 200ms ease-in;
      font-size: 1.2rem;
      opacity: 0.8;
    }
    .del-span {
      transition: 200ms ease-in;
      font-size: 1.2rem;
      opacity: 0.8;
    }
  }
  @media (max-width: 1450px) {
    max-height: initial;
    height: 100%;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  .delete-icon {
    cursor: pointer;
    opacity: 0;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
  .like {
    display: inline;
    cursor: pointer;
    transition: 200ms ease-out;
    margin-right: 5px;
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
    border-radius: 6px 0 0px 6px;
    width: 320px;
    height: 100%;
    object-fit: cover;
    @media (max-width: 1100px) {
      max-width: 100%;
      max-height: 400px;
      width: 100%;
      border-radius: 6px;
      border-radius: 6px 6px 0 0;
    }
  }
  p {
    max-width: 600px;
    margin: 10px auto;
    font-size: 1.6rem;
    word-break: break-word;
    line-height: 1.5;
    @media (max-width: 960px) {
      max-width: initial;
    }
  }
  h1 {
    margin: 0px auto;
    font-size: 2.6rem;
    max-width: 600px;
    line-height: 1.2;
    margin-right: 10px;
    @media (max-width: 1100px) {
      margin: auto;
    }
    @media (max-width: 960px) {
      max-width: initial;
    }
  }
  .formatted-date {
    font-size: 1.2rem;
    opacity: 0.8;
    position: relative;
    margin-right: 30px;
  }
  .edit-modal {
    height: 100vh;
    width: 100vw;
  }
  .edit-icon {
    position: absolute;
    right: 15px;
    bottom: 15px;
    width: 25px;
    cursor: pointer;
    height: 25px;
    @media (max-width: 1100px) {
      bottom: 20px;
      top: initial;
    }
  }

  .rec-span {
    margin-right: 15px;
    opacity: 0;
    font-size: 1.2rem;
  }

  .del-span {
    margin-right: 5px;
    opacity: 0;
    font-size: 1.2rem;
  }
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
