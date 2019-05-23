import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
import styled from 'styled-components'
import EditModal from 'components/utils/EditModal/EditModal'
import deleteIcon from 'assets/svg/delete-icon.svg'
import editSvg from 'assets/svg/edit.svg'
import SharedButton from '../shared'
import { selectLogo } from 'helpers'
import { StyledCollections } from './StyledCollections'
//TODO: Make selectLogo and selectRootUrl DRY

const Collection = props => {
  const posts = props.posts
    .map(post => (
      <Post key={post.id}>
        <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
          <img src={post.thumbnail_url} alt='' />
        </a>
        <div className='post-content'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
              <h1>{props.handleTruncateText(post.title, 80)}</h1>
            </a>
            <p>{props.handleTruncateText(post.description, 120)}</p>
            <a
              className='post-root-url'
              href={post.post_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div
                style={{
                  display: 'flex',
                  marginTop: '5px',
                  alignItems: 'center',
                }}
              >
                {selectLogo(post.post_url)}
                <span style={{ marginLeft: '5px' }}>
                  {post.post_url.includes('book') && !post.root_url
                    ? 'google.com'
                    : null}
                </span>
                <span style={{ marginLeft: '5px' }}>
                  {post.post_url.includes('youtube') && !post.root_url
                    ? 'youtube.com'
                    : null}
                </span>

                {post.root_url ? (
                  <span style={{ marginLeft: '0px' }}>{post.root_url}</span>
                ) : null}
              </div>
            </a>
          </div>
          <div className='date-like-heart'>
            <span className='formatted-date'>
              {moment(post.created_at).fromNow() === 'a few seconds ago' ? (
                'just now'
              ) : (
                <Moment fromNow>{post.created_at}</Moment>
              )}
            </span>

            <SharedButton bookmark={post} />
            <div
              className='delete-bookmark'
              onClick={() => props.handleDelete(post.id)}
            >
              <img src={deleteIcon} className='delete-icon' alt='delete icon' />
              <span className='del-span'>Delete</span>
            </div>
          </div>
          <div className='edit-icon'>
            <img
              src={editSvg}
              alt=''
              onClick={() => {
                props.handleModalOpen(post)
              }}
            />
          </div>
        </div>
      </Post>
    ))
    .reverse()

  return (
    <Wrapper>
      {props.modalOpen && (
        <EditModal
          open={props.modalOpen}
          handleModalOpen={props.handleModalOpen}
          post={props.editPost}
        />
      )}
      {posts}
    </Wrapper>
  )
}

export default Collection

const Wrapper = styled.div`
  padding: 0px 5px 0px;
`

const Post = styled.div`
  ${StyledCollections};
`
