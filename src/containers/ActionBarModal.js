import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ReuseablePortal from 'components/utils/ModalPortal'
import { ReactComponent as X } from 'assets/svg/x.svg'

const ShareModal = props => {
  const modalRef = useRef()
  const [tags, setTags] = useState('')
  const [textArea, setTextArea] = useState('')
  return props.isActive ? (
    <div>
      <ReuseablePortal>
        <ModalWrapper className='modal-wrapper' ref={modalRef}>
          <div className='modal_'>
            <div className='top'>
              <div className='modal_name'>Share to Feed</div>
              <div className='modal_close' onClick={props.setIsActive}>
                <X />
              </div>
            </div>
            <div className='modal_group'>
              <form
                className='add_link_form'
                onSubmit={e => {
                  e.preventDefault()
                  props.handleSubmit(textArea, tags)
                }}
              >
                <textarea
                  id='form-key'
                  placeholder='... add comment'
                  value={textArea}
                  type='text'
                  onChange={e => setTextArea(e.target.value)}
                  required
                />
                <label>Attach Tags</label>
                <input
                  value={tags}
                  className='tags'
                  placeholder='#tag #locker'
                  onChange={e => setTags(e.target.value)}
                />
                <button className='add-btn'>Add</button>
              </form>
            </div>
          </div>
        </ModalWrapper>
      </ReuseablePortal>
    </div>
  ) : null
}

export default ShareModal

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.88);
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
    border: 3px solid dodgerblue;
  }
  .tags {
    height: 30px;
    padding: 5px;
  }
  .top {
    display: flex;
    justify-content: space-between;
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
