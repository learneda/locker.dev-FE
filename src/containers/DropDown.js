import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import { withRouter } from 'react-router-dom'
import { smartTruncate } from 'styles/index'

const DropDown = props => {
  const {
    location,
    authId,
    userId,
    username,
    deletePostFromFeed,
    postId,
  } = props

  const [isActive] = useState(
    location.pathname === '/' || location.pathname.includes('/tag')
  )

  return props.isActive ? (
    <StyledDropDown className='DropDown'>
      <ul className='dropdown-list'>
        {isActive && authId !== userId && (
          <li className='dropdown-item'>
            Mute {smartTruncate(`@${username}`, 15)}
          </li>
        )}
        {isActive && authId !== userId && (
          <li className='dropdown-item'>
            Block {smartTruncate(`@${username}`, 15)}
          </li>
        )}
        {authId === userId && (
          <li
            className='dropdown-item'
            onClick={() => deletePostFromFeed(postId)}
          >
            Delete Post
          </li>
        )}
      </ul>
    </StyledDropDown>
  ) : null
}

export default withRouter(DropDown)

const StyledDropDown = styled.div`
  position: absolute;
  width: 180px;
  bottom: 45px;
  right: 0px;
  z-index: 1;
  background: #fff;
  ${elevations[4]};
  border-radius: 5px;

  .dropdown-item {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 1;
    font-size: 1.4rem;
    font-weight: 100;
    letter-spacing: 0.5px;
    align-items: center;
    height: 40px;
    width: 100%;
    padding: 10px;
    color: dodgerblue;
    transitions: all 400ms ease;
    &:hover {
      background: #e8f4fb;
      color: dodgerblue;
    }
  }
`
