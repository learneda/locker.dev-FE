import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CommentSVG from 'assets/react-svg/CommentSVG'
import HeartSVG from 'assets/react-svg/HeartSVG'
import PonySVG from 'assets/react-svg/PonySVG'
import styled from 'styled-components'
import FeedModal from './FeedModal'

const FeedBar = props => {
  const { user_id, post, handleReactionClick } = props
  const [heart, setHeart] = useState(false)
  const [pony, setPony] = useState(false)
  const [isLikeModal, setLikeModal] = useState(false)
  const [isPonyModal, setPonyModal] = useState(false)

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

  const handleClick = (hasReaction, reactionType) => {
    let reaction = null
    switch (reactionType) {
      case 'like':
        reaction = hasReaction ? 'unlike' : 'like'
        setHeart(prev => !prev)
        break
      case 'pony':
        reaction = hasReaction ? 'pony_down' : 'pony_up'
        setPony(prev => !prev)
      default:
        break
    }
    const data = {
      id: post.id,
      user_id,
      reaction,
    }
    handleReactionClick(data)
  }

  return (
    <Container>
      {isLikeModal && (
        <FeedModal type='likes' setActive={setLikeModal} postId={post.id} />
      )}
      {isPonyModal && (
        <FeedModal type='ponies' setActive={setPonyModal} postId={post.id} />
      )}
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
            handleClick(heart, 'like')
          }}
        >
          <HeartSVG active={heart} />
        </span>
        <span
          className='count'
          onClick={() => {
            if (!!post.likes) setLikeModal(true)
          }}
        >
          {post.likes}
        </span>
      </div>
      <div className='wrap'>
        <span
          className='svg'
          onClick={e => {
            handleClick(pony, 'pony')
          }}
        >
          <PonySVG active={pony} />
        </span>
        <span
          className='count'
          onClick={() => {
            if (!!post.ponyCount) setPonyModal(true)
          }}
        >
          {post.ponyCount}
        </span>
      </div>
    </Container>
  )
}

FeedBar.propTypes = {
  user_id: PropTypes.number.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hasLiked: PropTypes.bool.isRequired,
    hasPony: PropTypes.bool.isRequired,
    user_id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    likes: PropTypes.number.isRequired,
    ponyCount: PropTypes.number.isRequired,
  }).isRequired,
  handleReactionClick: PropTypes.func.isRequired,
}

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
