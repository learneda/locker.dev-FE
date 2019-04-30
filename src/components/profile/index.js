import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

import { truncateText } from '../mixins';
import { Wrapper, Post } from '../bookmarks';
import Like from '../likes/Like';
import NoPostScreen from '../utils/screens/NoPostScreen';
import { post as URL } from '../../services/baseURL';
import {
  getPosts,
  deletePost,
  editModalDisplay,
  editPostGetDefaultData,
  getSearchValue,
  saveLink,
} from '../../actions';
import plusIcon from '../../assets/svg/add-icon.svg';

class ProfileById extends Component {
  state = { modalOpen: false, posts: [] };

  componentDidMount = () => {
    this.getPosts();
    console.log(this.props.auth.id);
  };
  getPosts = () => {
    const id = this.props.match.params.id;
    axios.get(`${URL}/api/posts/all/${id}`).then(res => {
      this.setState({
        posts: res.data,
      });
    });
  };


  handleLike = async (id, liked, url) => {
    // await axios.put(`${URL}/api/posts/like/${id}`, { status: !liked });


//   handleSaveToMyBookmarks = async (id, url) => {
//     console.log('in handle save bookmarks', id, url)

    const post = {
      post_url: url,
    };

    axios.post(`${URL}/api/posts`, post).then(() => console.log('post was added'));

  
  };
  handleSave = async url => {
    const post = {
      post_url: url,
      id: this.props.auth.id,
    };
    await axios.post(`${URL}/api/posts`, post);
    await this.getPosts();
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
          <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
            <img src={post.thumbnail_url} alt='' />
          </a>
          <div className='post-content'>
            <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
              <h1>{this.handleTruncateText(post.title)}</h1>
            </a>
            <p>{this.handleTruncateText(post.description, 15)}</p>
            <div className='date-like-heart'>
              <span className='formatted-date'>
                Added <Moment fromNow>{post.created_at}</Moment>
              </span>
              <div
                className='save-to-profile'
                onClick={() => this.handleSave(post.post_url)}
              >
                <img src={plusIcon} className='add-icon' alt='' />
                <span className='rec-span'>Save to Bookmarks</span>
              </div>

            </div>
          </div>
        </Post>
      ))
      .reverse();

    if (posts.length === 0) {
      return (
        <NoPostScreen textDescription='No courses or articles have been bookmarked yet.' />
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
    modalOpen: state.modal.isEditOpen,
    editFormData: state.modal.editFormData,
    auth: state.auth,
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
      getSearchValue,
      saveLink,
    }
  )(ProfileById)
);
