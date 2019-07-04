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
      console.log('RES', res.data)
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
          <div ref={modalRef} className='modal_'>
            <div className='top'>
              <div className='modal_name'>Likes</div>
              <div className='modal_close' onClick={() => setActive(false)}>
                <X />
              </div>
            </div>
            <div className='modal_group'>
              <div>
                {likes.map((like, index) => (
                  <li key={index}>{like.username}</li>
                ))}
              </div>
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
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;

  .modal_ {
    background-color: white;
    position: absolute;
    z-index: 1;
    text-align: center;
    top: 30%;
    left: 50%;
    transform: translate(-250px, -70px);
    width: 500px;
    height: 400px;
    border-radius: 6px;
    border: 2px solid powderblue;
  }
  .tags {
    height: 30px;
    padding: 5px;
  }
  .top {
    display: flex;
    justify-content: center;
    padding: 13px 18px 13px 25px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal_name {
    letter-spacing: 1px;
    font-size: 2rem;
    text-align: center;
  }

  .modal_close {
    position: absolute;
    top: 13px;
    right: 18px;
  }

  .modal_group {
    position: relative;
  }
  .add_link_form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 13px 13px 13px;
    height: 280px;
  }
  #form-key {
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px 8px;
    margin: 0;
    color: #000;
    width: 350px;
    margin-right: 10px;
    outline: none;
    height: 165px;
    width: 100%;
    resize: none;
    &:focus {
      border: 1px solid dodgerblue;
    }
  }
  .add-btn {
    padding: 5px 30px;
    border-radius: 5px;
    color: dodgerblue;
    font-size: 1.6rem;
    letter-spacing: 1px;
    transition: 200ms ease-out;
    cursor: pointer;
    &:hover {
      background-color: #e8f4fb;
      border: 1px solid dodgerblue;
    }
  }

  .modal_close:hover {
    cursor: pointer;
  }

  .root-modal-open {
    filter: blur(7px);
  }
`
