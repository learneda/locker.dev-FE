import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import { customWrapper, truncateText } from 'styles'
import NoPostScreen from 'components/screens/NoPostScreen'
import { apiURL } from 'services'
import { fetchCollections, deleteCollection } from 'actions'
import plusIcon from 'assets/svg/add-icon.svg'
import check from 'assets/svg/check.svg'
import { useAlert } from 'react-alert'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const OtherCollections = props => {
  const {
    searchTerm,
    auth,
    match,
    collections,
    createCollection,
    fetchProfileCollections,
  } = props
  const alert = useAlert()

  const handleSave = async (url, postId) => {
    // saves user's post to your collection
    const post = {
      post_url: url,
      id: auth.id,
    }
    alert.success('Post added to Saved')
    // create new collection
    createCollection(post).then(async result => {
      // saves post id to users account to keep track of saved posts toggle
      const profileId = match.params.id
      const userId = auth.id
      const body = {
        user_id: userId,
        saved_from_id: profileId,
        post_id: postId,
        created_post_id: result.post_id,
      }

      await axios.post(`${apiURL}/users/saved-post-ids`, body)
      await fetchProfileCollections(match.params.id)
    })
  }

  const handleTruncateText = (content, limit = 10) =>
    truncateText(content, limit)

  const search = searchTerm

  const filteredPosts = collections.filter(post => {
    return (
      (post.title && post.title.toLowerCase().includes(search.toLowerCase())) ||
      (post.thumbnail_url &&
        post.thumbnail_url.toLowerCase().includes(search.toLowerCase())) ||
      (post.description &&
        post.description.toLowerCase().includes(search.toLowerCase()))
    )
  })

  const displayPosts = filteredPosts
    .map(post => (
      <Post key={post.id}>
        <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
          <img src={post.thumbnail_url} alt='' />
        </a>
        <div className='post-content'>
          <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
            <h1>{handleTruncateText(post.title)}</h1>
          </a>
          <p>{handleTruncateText(post.description, 15)}</p>
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
                <span className='rec-span'>
                  <span role='img' aria-label='check'>
                    ✅
                  </span>
                  Saved
                </span>
              </div>
            ) : (
              <div
                className='save-to-profile'
                onClick={() => handleSave(post.post_url, post.id)}
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

  if (displayPosts.length === 0) {
    return (
      <NoPostScreen textDescription='No courses or articles have been bookmarked yet.' />
    )
  } else {
    return (
      <Wrapper>
        <ScrollToTopOnMount />
        {displayPosts}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchTerm: state.search.searchTerm,
    modalOpen: state.modal.isEditOpen,
    editFormData: state.modal.editFormData,
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    deleteCollection,
  }
)(withRouter(OtherCollections))

const Wrapper = styled.div`
  ${customWrapper('100%', '0 auto')};
`

const Post = styled.div`
  ${customWrapper('100%', 'auto')};
  min-height: 200px;
  max-height: 250px;
`
