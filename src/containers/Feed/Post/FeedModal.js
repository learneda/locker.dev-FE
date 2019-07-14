import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReuseablePortal from 'components/Utils/ModalPortal'
import useOnClickOutside from 'use-onclickoutside'
import { ReactComponent as X } from 'assets/svg/x.svg'
import axios from 'apis/axiosAPI'

const FeedModal = props => {
  const { setActive, postId, type } = props
  const modalRef = useRef()
  const [items, setItems] = useState([])

  // detect clicks outside of modalRef
  useOnClickOutside(modalRef, () => setActive(false))

  useEffect(() => {
    axios.post(`/posts/${type}/users`, { post_id: postId }).then(res => {
      setItems(res.data)
    })
  }, [])

  const closeOnEsc = e => {
    if (e.which === 27) {
      setActive(false)
    }
  }

  const printTitle = type => {
    return type[0].toUpperCase() + type.slice(1)
  }

  const renderItemList = items => {
    return items.map((item, index) => (
      <li key={index} className='type-item'>
        <div className='type-avatar'>
          <img className='type-img' src={item.profile_picture} alt='avatar' />
        </div>
        <div className='type-info'>
          <span className='type-username'>{item.username}</span>
          <span className='type-name'>{item.display_name}</span>
        </div>
        <button className='type-button'>Follow</button>
      </li>
    ))
  }

  return (
    <ReuseablePortal>
      <ModalWrapper className='modal-wrapper' onKeyDownCapture={closeOnEsc}>
        <div ref={modalRef} className='modal-main'>
          <div className='modal-top'>
            <div className='modal-title'>{printTitle(type)}</div>
            <div className='modal-close' onClick={() => setActive(false)}>
              <X />
            </div>
          </div>
          <div className='modal-content'>{renderItemList(items)}</div>
        </div>
      </ModalWrapper>
    </ReuseablePortal>
  )
}

export default FeedModal

FeedModal.propTypes = {
  type: PropTypes.string.isRequired,
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
  .modal-main {
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

  .modal-top {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal-title {
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

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .type-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    height: 60px;
  }
  .type-avatar {
    margin-left: 10px;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
  }
  .type-img {
    border-radius: 50%;
    border: 1px solid powderblue;
    width: 45px;
    height: 45px;
  }
  .type-info {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 10px;
  }
  .type-username {
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 1.5px;
    padding-top: 8px;
  }
  .type-name {
    font-size: 1.4rem;
    font-weight: thin;
    letter-spacing: 1px;
    padding-bottom: 8px;
    color: #657786;
  }

  .type-button {
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
