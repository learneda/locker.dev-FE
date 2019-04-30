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
import check from '../../assets/svg/check.svg';
import { withAlert } from 'react-alert';

class ProfileById extends Component {
  state = { modalOpen: false, posts: [], savedPostIds: [] };

  componentDidMount = () => {
    this.getPosts();
    console.log(this.props.auth.id);
    // const saved = JSON.parse(localStorage.getItem('saved'));
    // this.setState({
    //   saved,
    // });
    this.getSavedPostIds();
  };
  getPosts = () => {
    const id = this.props.match.params.id;
    axios.get(`${URL}/api/posts/all/${id}`).then(res => {
      this.setState({
        posts: res.data,
      });
    });
  };

  getSavedPostIds = () => {
    const profileId = this.props.match.params.id;
    const userId = this.props.auth.id;

    axios
      .get(
        `${URL}/api/users/saved-post-ids?user_id=${userId}&saved_from_id=${profileId}`
      )
      .then(res => {
        this.setState({
          savedPostIds: res.data,
        });
      });
  };

  handleSave = async (url, postId) => {
    // saves user's post to your bookmarks
    const post = {
      post_url: url,
      id: this.props.auth.id,
    };
    axios.post(`${URL}/api/posts`, post);

    // saves post id to users account to keep track of saved posts toggle
    const profileId = this.props.match.params.id;
    const userId = this.props.auth.id;
    const body = {
      user_id: userId,
      saved_from_id: profileId,
      post_id: postId,
    };

    await axios.post(`${URL}/api/users/saved-post-ids`, body);
    await this.getSavedPostIds();
  };

  handleTruncateText = (content, limit = 10) => truncateText(content, limit);

  // toggles save icon and checkmark
  // handleToggleSave = (id, url) =>
  //   this.state.savedPostIds.map(post => {
  //     if (post.post_id === id) {
  //       return <p>yoooo</p>;
  //     } else {
  //       return 's;fons;';
  //     }
  //   });
  // console.log(id);
  // console.log(this.state.savedPostIds.length);
  // if (this.state.savedPostIds.length > 0) {
  //   this.state.savedPostIds.map(post => {
  //     console.log(post, id);
  //     console.log(post.post_id === id);
  //     if (post.post_id == id) {
  //       return (
  //         <div className='save-to-profile'>
  //           <img src={check} className='add-icon' alt='' />
  //           <span className='rec-span'>Saved to Bookmarks</span>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div
  //           className='save-to-profile'
  //           onClick={() => this.handleSave(url, id)}
  //         >
  //           <img src={plusIcon} className='add-icon' alt='' />
  //           <span className='rec-span'>Save to Bookmarks</span>
  //         </div>
  //       );
  //     }
  //   });
  // } else {
  //   return (
  //     <div
  //       className='save-to-profile'
  //       onClick={() => this.handleSave(url, id)}
  //     >
  //       <img src={plusIcon} className='add-icon' alt='' />
  //       <span className='rec-span'>Save to Bookmarks</span>
  //     </div>
  //   );
  // }

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
              {this.state.savedPostIds.map(savedPost =>
                savedPost.post_id === post.id ? (
                  <div className='save-to-profile'>
                    <img src={check} className='add-icon' alt='' />
                    <span className='rec-span'>Saved to Bookmarks</span>
                  </div>
                ) : (
                  <div
                    className='save-to-profile'
                    onClick={() => this.handleSave(post.post_url, post.id)}
                  >
                    <img src={plusIcon} className='add-icon' alt='' />
                    <span className='rec-span'>Save to Bookmarks</span>
                  </div>
                )
              )}
              {this.state.savedPostIds.length === 0 ? (
                <div
                  className='save-to-profile'
                  onClick={() => this.handleSave(post.post_url, post.id)}
                >
                  <img src={plusIcon} className='add-icon' alt='' />
                  <span className='rec-span'>Save to Bookmarks</span>
                </div>
              ) : null}
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

const Alert = withAlert()(ProfileById);

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
  )(Alert)
);
