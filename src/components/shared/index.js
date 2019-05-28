// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import ReusablePortal from '../utils/ModalPortal'
import { connect } from 'react-redux'
import { shareCollection } from 'actions/index'
import { StyledAddLink } from '../utils/StyledAddLink.js'
import styled from 'styled-components'
import { ReactComponent as X } from 'assets/svg/x.svg'
import shareSvg from 'assets/svg/share.svg'
import { useAlert } from 'react-alert'

const SharedButton = props => {
  const { bookmark } = props
  const alert = useAlert()
  const [title, setTitle] = useState(bookmark.title)
  const [description, setDescription] = useState(bookmark.description)
  const [post_url, setPostUrl] = useState(bookmark.post_url)
  const [user_thoughts, setUserThoughts] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  //* Locks scroll on body and hides overflow when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.getElementById('body').setAttribute('style', 'overflow: hidden')
    } else {
      document.getElementById('body').setAttribute('style', 'overflow: auto')
    }
  }, [isModalOpen])

  const toggle = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { id } = bookmark
    const editedPost = {
      id,
      title,
      description,
      post_url,
      user_thoughts,
      shared: true,
    }

    props.shareCollection(editedPost).then(res => {
      alert.success('Post shared to Feed')
      setIsModalOpen(false)
    })
  }

  return (
    <div>
      <div className='share-to-feed' onClick={toggle}>
        <img src={shareSvg} alt='Share to feed' />
        <span>Share</span>
      </div>
      {isModalOpen && (
        <ReusablePortal>
          <ModalWrapper className='modal-wrapper' onClick={toggle}>
            <div className='modal_' onClick={e => e.stopPropagation()}>
              <div className='top'>
                <div className='modal_name'>Share Collection</div>
                <div className='modal_close' onClick={toggle}>
                  <X />
                </div>
              </div>
              <div className='modal_group'>
                <form onSubmit={handleSubmit} className='add_link_form'>
                  <label htmlFor='Post Url'>Title</label>
                  <input
                    name='title'
                    id='post-description'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <label htmlFor='Post Url'>Url</label>
                  <input
                    name='post_url'
                    id='post-description'
                    value={post_url}
                    onChange={e => setPostUrl(e.target.value)}
                  />
                  <label htmlFor='Post Description'>Description</label>
                  <textarea
                    name='description'
                    id='post-description'
                    rows='7'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <label htmlFor='Post Description'>
                    Add your thoughts to this post
                  </label>
                  <textarea
                    name='userThoughts'
                    id='post-description'
                    rows='7'
                    value={user_thoughts}
                    onChange={e => setUserThoughts(e.target.value)}
                  />
                  <input type='submit' id='edit-submit' value='SHARE!' />
                </form>
              </div>
            </div>
          </ModalWrapper>
        </ReusablePortal>
      )}
    </div>
  )
}

export default connect(
  null,
  { shareCollection }
)(SharedButton)

const ModalWrapper = styled.div`
  ${StyledAddLink};
  overflow: auto;
  text-align: left;
  z-index: 20;

  .modal_ {
    /* margin-top: 2%; */
    margin: 80px auto;
    border-radius: 15px;
    max-width: 700px;
    width: 90%;
    @media (max-width: 650px) {
      border-radius: 8px;
      margin: 60px auto;
    }
  }
  .top {
    background: #3f65f2;
    color: #fff;
    border-radius: 14px 14px 0 0;
    @media (max-width: 650px) {
      border-radius: 7px 7px 0 0;
    }
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
`
