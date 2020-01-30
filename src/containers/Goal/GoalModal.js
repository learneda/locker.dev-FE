import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useLockBodyScroll from 'hooks/useLockBodyScroll'
import useOnClickOutside from 'use-onclickoutside'

const GoalModal = props => {
  const modalRef = useRef()
  useLockBodyScroll()
  useOnClickOutside(modalRef, () => props.close(false))

  const handelSubmit = e => {
    e.preventDefault()
    props.close(false)
    setTimeout(() => alert('Goal Success! Auto-post achievememt to Feed'), 500)
  }

  return (
    <StyledGoalModal ref={modalRef}>
      <header className='goal-heading'>Completed?</header>
      <form className='goal-form' onSubmit={handelSubmit}>
        <div className='goal-assessment'>
          <div className='goal-survey goal-comprehension'>
            Mastery:<span>😞</span>
            <span>😐</span> <span>😃</span>
          </div>
          <div className='goal-survey goal-recommend'>
            Recommend: <span>🚫</span> <span>✅</span>
          </div>
        </div>
        <div className='goal-btn-wrapper'>
          <button
            onClick={() => props.close(false)}
            className='goal-btn goal-btn-cancel'
          >
            Not Yet
          </button>
          <button type='submit' className='goal-btn goal-btn-submit'>
            Yes!
          </button>
        </div>
      </form>
    </StyledGoalModal>
  )
}

GoalModal.propTypes = {}

export default GoalModal

const StyledGoalModal = styled.div`
  position: absolute;
  top: 15%;
  width: 400px;
  height: 350px;
  border-radius: 6px;
  border: 2px solid lightgrey;
  background-color: white;
  .goal-heading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 2.2rem;
    letter-spacing: 1.2px;
    font-weight: thin;
    color: dodgerblue;
    border-bottom: 1px solid lightgrey;
  }
  .goal-form {
    height: 350px;
    display: flex;
    flex-direction: column;
    .goal-assessment {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 210px;
      font-size: 2rem;
      letter-spacing: 1.6px;
      .goal-survey {
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 30px;
        span {
          font-size: 3rem;
          margin-left: 40px;
          transition: all 450ms ease;
          &:hover {
            transform: scale(1.4);
          }
        }
      }
      .goal-survey .goal-recommend {
        span {
          margin-left: 80px;
        }
      }
    }

    .goal-btn-wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 90px;
      border-top: 1px solid lightgrey;
      .goal-btn {
        font-size: 1.8rem;
        font-weight: bold;
        letter-spacing: 2px;
        cursor: pointer;
      }
      .goal-btn-cancel {
        height: 50px;
        width: 150px;
        color: crimson;
        border: 1px solid crimson;
        background: none;
        transition: all 300ms ease;
        &:hover {
          background: crimson;
          color: white;
        }
      }
      .goal-btn-submit {
        height: 50px;
        width: 150px;
        color: dodgerblue;
        background: none;
        border: 1px solid dodgerblue;
        transition: all 300ms ease;
        &:hover {
          color: white;
          background: dodgerblue;
        }
      }
    }
  }
`
