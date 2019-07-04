import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReuseablePortal from 'components/utils/ModalPortal'
import useOnClickOutside from 'use-onclickoutside'
import { ReactComponent as X } from 'assets/svg/x.svg'
import axios from 'apis/axiosAPI'

const LikeModal = props => {
  const { setActive, postId } = props
  const modalRef = useRef()
  const [likes, setLikes] = useState([])

  // detect clicks outside of modalRef
  useOnClickOutside(modalRef, () => setActive(false))

  useEffect(() => {
    axios.post('/posts/like/users', { post_id: postId }).then(res => {
      setLikes(res.data)
    })
  }, [])

  return (
    <div>
      <ReuseablePortal>
        <ModalWrapper
          className='modal-wrapper'
          onKeyDownCapture={e => {
            if (e.which === 27) {
              setActive(false)
            }
          }}
        >
          <div ref={modalRef} className='modal'>
            <div className='top'>
              <div className='modal-name'>Likes</div>
              <div className='modal-close' onClick={() => setActive(false)}>
                <X />
              </div>
            </div>
            <div className='modal-group'>
              {likes.map((like, index) => (
                <li key={index} className='like-item'>
                  <div className='like-avatar'>
                    <img
                      className='like-img'
                      src={like.profile_picture}
                      alt='avatar'
                    />
                  </div>
                  <div className='like-info'>
                    <span className='like-username'>{like.username}</span>
                    <span className='like-name'>{like.display_name}</span>
                  </div>
                  <button className='like-button'>Follow</button>
                </li>
              ))}
            </div>
          </div>
        </ModalWrapper>
      </ReuseablePortal>
    </div>
  )
}

export default LikeModal

LikeModal.propTypes = {
  setActive: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 20;
  .modal {
    background-color: white;
    position: absolute;
    z-index: 3;
    top: 20%;
    left: 50%;
    transform: translate(-200px, 0);
    width: 400px;
    height: 400px;
    border-radius: 6px;
    border: 2px solid powderblue;
  }

  .top {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal-name {
    letter-spacing: 1px;
    font-size: 2rem;
  }

  .modal-close {
    position: absolute;
    top: 13px;
    right: 18px;
    &:hover {
      cursor: pointer;
    }
  }

  .modal-group {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .like-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    height: 60px;
  }
  .like-avatar {
    margin-left: 10px;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
  }
  .like-img {
    border-radius: 50%;
    border: 1px solid powderblue;
    width: 45px;
    height: 45px;
  }
  .like-info {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 10px;
  }
  .like-username {
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 1.5px;
    padding-top: 8px;
  }
  .like-name {
    font-size: 1.4rem;
    font-weight: thin;
    letter-spacing: 1px;
    padding-bottom: 8px;
    color: #657786;
  }

  .like-button {
    height: 30px;
    width: 90px;
    border: transparent;
    border-radius: 50px;
    background-color: white;
    border: 1px solid dodgerblue;
    color: dodgerblue;
    cursor: pointer;
    margin-right: 15px;
    transition: 200ms ease-out;
    font-size: 1.3rem;
    letter-spacing: 0.9;
    &:hover {
      background-color: #e8f4fb;
    }
  }
`
