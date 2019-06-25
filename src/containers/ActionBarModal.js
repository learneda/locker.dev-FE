import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import ReuseablePortal from 'components/utils/ModalPortal'
import { ReactComponent as X } from 'assets/svg/x.svg'
import useOnClickOutside from 'use-onclickoutside'

const ShareModal = props => {
  const textareaRef = useRef()
  const [tags, setTags] = useState('')
  const [textArea, setTextArea] = useState('')
  const { isActive, setIsActive, handleSubmit } = props
  useEffect(() => {
    if (isActive) {
      textareaRef.current.focus()
    }
  }, [isActive])
  return isActive ? (
    <div>
      <ReuseablePortal>
        <ModalWrapper
          className='modal-wrapper'
          onKeyDownCapture={e => {
            if (e.which === 27) {
              setIsActive()
            }
          }}
        >
          <div className='modal_'>
            <div className='top'>
              <div className='modal_name'>Share to Feed</div>
              <div className='modal_close' onClick={setIsActive}>
                <X />
              </div>
            </div>
            <div className='modal_group'>
              <form
                className='add_link_form'
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit(textArea, tags)
                }}
              >
                <textarea
                  id='form-key'
                  placeholder='... add thought'
                  value={textArea}
                  type='text'
                  onChange={e => setTextArea(e.target.value)}
                  ref={textareaRef}
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

const Container = styled.div`
  margin-left: 20px;

  span {
    display: flex;
    height: 30px;
    width: 30px;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: 700;
    border: 1px solid #bfc5c9;
    border-radius: 50%;
    cursor: pointer;
    transition: 300ms ease;
    &:hover {
      border: 1px solid dodgerblue;
    }
  }
`
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
