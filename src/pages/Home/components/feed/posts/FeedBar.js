import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CommentSVG from 'assets/react-svg/CommentSVG'
import HeartSVG from 'assets/react-svg/HeartSVG'
import PonySVG from 'assets/react-svg/PonySVG'
import styled from 'styled-components'

const FeedBar = props => {
  const { user_id, username, post, handleClick, handlePony } = props
  const [heart, setHeart] = useState(false)
  const [pony, setPony] = useState(false)

  useEffect(() => {
    if (post) {
      if (post.hasLiked) {
        setHeart(true)
      }
      if (post.hasPony) {
        setPony(true)
      }
    }
  }, [])

  const handleHeartClick = (e, post_id, post) => {
    const postOwnerId = post.user_id

    if (heart) {
      const data = {
        id: post_id,
        user_id: user_id,
        action: 'unlike',
      }
      handleClick(data)
    } else {
      const data = {
        id: post_id,
        user_id: user_id,
        action: 'like',
        postOwnerId,
        username: username,
      }
      handleClick(data)
    }
    setHeart(prev => !prev)
  }

  const handlePonyClick = (e, post_id, post) => {
    const postOwnerId = post.user_id
    if (pony) {
      const data = {
        id: post_id,
        user_id: user_id,
        action: 'pony_down',
      }
      handlePony(data)
    } else {
      const data = {
        id: post_id,
        user_id: user_id,
        action: 'pony_up',
        postOwnerId,
        username: username,
      }
      handlePony(data)
    }
    setPony(prev => !prev)
  }

  return (
    <Container>
      <div className='wrap'>
        <span className='svg'>
          <CommentSVG active={post.comments.length} />
        </span>
        <span className='count'>{post.comments.length}</span>
      </div>
      <div className='wrap'>
        <span
          className='svg'
          onClick={e => {
            handleHeartClick(e, post.id, post)
          }}
        >
          <HeartSVG active={heart} />
        </span>
        <span className='count'>{post.likes}</span>
      </div>
      <div className='wrap'>
        <span
          className='svg'
          onClick={e => {
            handlePonyClick(e, post.id, post)
          }}
        >
          <PonySVG active={pony} />
        </span>
        <span className='count'>{post.ponyCount}</span>
      </div>
    </Container>
  )
}

FeedBar.propTypes = {}

export default FeedBar

const Container = styled.div`
  display: flex;
  padding: 0 15px;
  .wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: dodgerblue;
    }
  }
  .svg {
    margin-right: 5px;
  }
  .count {
    margin-right: 20px;
  }
`
