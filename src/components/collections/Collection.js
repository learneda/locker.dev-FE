import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
import styled from 'styled-components'
import EditModal from '../utils/EditModal/EditModal'
import deleteIcon from '../../assets/svg/delete-icon.svg'
import editSvg from '../../assets/svg/edit.svg'
import SharedButton from '../shared'
import { StyledCollections } from './StyledCollections'

export default function(props) {
  const posts = props.posts
    .map(post => (
      <Post key={post.id}>
        <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
          <img src={post.thumbnail_url} alt='' />
        </a>
        <div className='post-content'>
          <a href={post.post_url} target='_blank' rel='noopener noreferrer'>
            <h1>{props.handleTruncateText(post.title, 9)}</h1>
          </a>
          <p>{props.handleTruncateText(post.description, 15)}</p>
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

const Wrapper = styled.div`
  padding: 0px 5px 0px;
`

const Post = styled.div`
  ${StyledCollections};
`
