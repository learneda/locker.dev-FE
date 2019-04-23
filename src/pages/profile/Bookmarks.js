import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';
import styled from 'styled-components';

import { customWrapper, truncateText } from '../../components/mixins';
import Like from '../../components/likes/Like';
import EditModal from '../../components/utils/EditModal/EditModal';
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
import HelpScreen from '../../components/utils/screens/HelpScreen';
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
  display: flex;
  margin-bottom: 35px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  background-color: #fff;
  max-height: 250px;
  height: 200px;
  position: relative;
  .date-like-heart {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 12px;
  }
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
    /* max-height: initial; */
    height: 200px;
  }
  @media (max-width: 1250px) {
    flex-direction: column;
    max-height: none;
    height: 100%;
  }
  .delete-icon {
    cursor: pointer;
    opacity: 0;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
  .like {
    display: flex;
    justify-content: center;
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

    @media (max-width: 1500px) {
      width: 270px;
    }
    @media (max-width: 1250px) {
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
    margin-bottom: 20px;
    font-size: 1.5rem;
    word-break: break-word;
    line-height: 1.5;
    /* border: 1px solid lightblue; */
    height: 70px;
    @media (max-width: 1250px) {
      margin: 10px 0;
      padding-bottom: 25px;
    }
    @media (max-width: 960px) {
      max-width: initial;
    }
  }
  h1 {
    margin: 0px auto;
    font-size: 2.3rem;
    font-weight: 700;
    max-width: 600px;
    line-height: 1.2;
    margin-right: 10px;
    /* border: 1px solid pink; */
    max-height: 55px;
    overflow: hidden;
    @media (max-width: 1250px) {
      margin: 0;
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
    @media (max-width: 1250px) {
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
