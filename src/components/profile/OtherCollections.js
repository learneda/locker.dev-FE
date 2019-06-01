import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import { StyledCollections } from '../collections/StyledCollections'
import { customWrapper, truncateText } from '../mixins'
import NoPostScreen from '../utils/screens/NoPostScreen'
import { apiURL } from 'services'
import { fetchCollections, deleteCollection } from 'actions'
import plusIcon from 'assets/svg/add-icon.svg'
import check from 'assets/svg/check.svg'
import { withAlert } from 'react-alert'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

class OtherCollections extends Component {
  state = { modalOpen: false, posts: [], savedPostIds: [] }

  getPosts = async () => {
    const id = this.props.match.params.id
    const posts = await axios.get(`${apiURL}/posts/all/${id}`)
    this.setState({
      posts: posts.data,
    })
  }

  handleSave = async (url, postId) => {
    // saves user's post to your collection
    const post = {
      post_url: url,
      id: this.props.auth.id,
    }
    this.props.alert.success('Post added to Saved')
    // create new collection
    this.props.createCollection(post).then(async result => {
      // saves post id to users account to keep track of saved posts toggle
      const profileId = this.props.match.params.id
      const userId = this.props.auth.id
      const body = {
        user_id: userId,
        saved_from_id: profileId,
        post_id: postId,
        created_post_id: result.post_id,
      }

      await axios.post(`${apiURL}/users/saved-post-ids`, body)
      await this.props.fetchProfileCollections(this.props.match.params.id)
    })
  }

  handleTruncateText = (content, limit = 10) => truncateText(content, limit)

  render() {
    const search = this.props.searchTerm

    const filteredPosts = this.props.collections.filter(post => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(search.toLowerCase())) ||
        (post.thumbnail_url &&
          post.thumbnail_url.toLowerCase().includes(search.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(search.toLowerCase()))
      )
    })

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
            <a
              className='post-root-url'
              href={post.post_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {post.root_url}
            </a>
            <div className='date-like-heart'>
              <span className='formatted-date'>
                Added <Moment fromNow>{post.created_at}</Moment>
              </span>
              {post.saved_to_profile ? (
                <div className='save-to-profile'>
                  <img src={check} className='add-icon' alt='' />
                  <span className='rec-span'>✅ Saved</span>
                </div>
              ) : (
                <div
                  className='save-to-profile'
                  onClick={() => this.handleSave(post.post_url, post.id)}
                >
                  <img src={plusIcon} className='add-icon' alt='' />
                  <span className='rec-span'>Add to Saved</span>
                </div>
              )}
            </div>
          </div>
        </Post>
      ))
      .reverse()

    if (posts.length === 0) {
      return (
        <NoPostScreen textDescription='No courses or articles have been bookmarked yet.' />
      )
    } else {
      return (
        <Wrapper>
          <ScrollToTopOnMount />
          {posts}
        </Wrapper>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    searchTerm: state.searchTerm,
    modalOpen: state.modal.isEditOpen,
    editFormData: state.modal.editFormData,
    auth: state.auth,
  }
}

const Alert = withAlert()(OtherCollections)

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    deleteCollection,
  }
)(withRouter(Alert))

const Wrapper = styled.div`
  ${customWrapper('100%', '0 auto')};
`

const Post = styled.div`
  ${customWrapper('100%', 'auto')};
  ${StyledCollections};
  min-height: 200px;
  max-height: 250px;
`
