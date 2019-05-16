import React from 'react'
import styled from 'styled-components'
import upArrow from '../../assets/svg/up-arrow.svg'
import { Link } from 'react-router-dom'

export default function FollowingDropdown(props) {
  let following = ''
  if (props.following.length > 0) {
    following = props.following.map((follow, index) => (
      <Link key={index} to={`/profile/${follow.id}`}>
        <div className='follow'>
          <img src={follow.profile_picture} alt='' />
          <h2>{follow.username}</h2>
        </div>
      </Link>
    ))
  }
  return (
    <StyledDropdown
      className='follow-stats-dropdown'
      style={{ height: props.height }}
    >
      <img
        className='caret-up'
        src={upArrow}
        alt=''
        onClick={props.handleFollowingDropdown}
      />
      {following}
    </StyledDropdown>
  )
}

const StyledDropdown = styled.div`
  position: absolute;
  top: 240px;
  left: 0;
  right: 0;
  background: #fff;
  width: 100%;
  overflow: auto;
  transition: 200ms height ease-in-out;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 0 0 5px 5px;
  .caret-up {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 3px;
    top: 10px;
    cursor: pointer;
  }
  a {
    margin: 15px 0;
    &:hover {
      h2 {
        opacity: 1;
        transition: 200ms ease-in;
      }
    }
  }
  .follow {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h2 {
    font-size: 1.8rem;
    opacity: 0.7;
    transition: 200ms ease-out;
  }
`
