import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReusablePortal from 'components/utils/ModalPortal'
import { createCollection } from 'actions'
import { ReactComponent as X } from 'assets/svg/x.svg'
import { useAlert } from 'react-alert'
import AddLinkSVG from './components/AddLinkSVG'
import useOnClickOutside from 'use-onclickoutside'

const AddLink = props => {
  const { auth, createCollection } = props
  const inputRef = useRef()
  const modalRef = useRef()
  const alert = useAlert()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  useOnClickOutside(modalRef, e => {
    if (e.target.id == 'svg-addlink') {
      return
    }
    setIsModalOpen(false)
  })
  const handleSubmit = async e => {
    e.preventDefault()
    setIsModalOpen(false)
    const res = await props.createCollection({
      post_url: inputValue,
      type: 'link',
    })
    setInputValue('')
    // console.log('response from createCollection ==>', res)
    if (res.msg === 'success') {
      alert.success('Link added to Saved')
    } else if (res.msg === 'whoops!') {
      alert.error('whoops, unable to add')
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current.focus()
    }
  }, [isModalOpen])

  return (
    <Container
      isModalOpen={isModalOpen}
      onKeyDownCapture={e => {
        if (e.which === 27) {
          setIsModalOpen(false)
        }
      }}
    >
      <span onClick={() => setIsModalOpen(prev => !prev)}>
        <AddLinkSVG addLinkColor={isModalOpen ? 'dodgerblue' : 'black'} />
      </span>
      {isModalOpen && (
        <ReusablePortal>
          <ModalWrapper
            className='modal-wrapper'
            onClick={e =>
              e.target.className === 'modal-wrapper' &&
              setIsModalOpen(prev => !prev)
            }
          >
            <div className='modal_' ref={modalRef}>
              <div className='top'>
                <div className='modal_name'>Add a link</div>
                <div
                  className='modal_close'
                  onClick={() => setIsModalOpen(false)}
                >
                  <X />
                </div>
              </div>
              <div className='modal_group'>
                <form onSubmit={handleSubmit} className='add_link_form'>
                  <input
                    ref={inputRef}
                    id='form-key'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder='www.example.com/article.html'
                    type='text'
                    required
                  />
                  <button className='add-btn'>Add</button>
                </form>
              </div>
            </div>
          </ModalWrapper>
        </ReusablePortal>
      )}
    </Container>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { createCollection }
)(AddLink)

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
    border: ${props =>
      props.isModalOpen ? '1px solid dodgerblue' : ' 1px solid #bfc5c9'};
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
    max-width: 500px;
    border-radius: 6px;
    border: 3px solid dodgerblue;
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
    justify-content: space-between;
    padding: 0 13px 13px 13px;
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
