import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FollowingPlaceHolder from './FollowingPlaceholder'

const HashTagHeader = props => {
  const { isFollowing, tag, followTag, unfollowTag } = props
  return isFollowing !== null ? (
    <Flex isFollowing={isFollowing}>
      <h1 className='tag-heading'>{tag}</h1>
      <div
        className='tag-choice'
        onClick={() => {
          if (isFollowing) {
            unfollowTag(tag)
          } else {
            followTag(tag)
          }
        }}
      >
        {isFollowing ? '✔ Following' : '+ Follow'}
      </div>
    </Flex>
  ) : (
    <Flex>
      <FollowingPlaceHolder />
    </Flex>
  )
}

export default HashTagHeader

HashTagHeader.propTypes = {
  isFollowing: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  tag: PropTypes.string.isRequired,
  followTag: PropTypes.func.isRequired,
  unfollowTag: PropTypes.func.isRequired,
}

const Flex = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  background: #fff;
  justify-content: center;
  align-items: center;
  height: 70px;
  z-index: 1;
  border: 1px solid dodgerblue;
  margin-bottom: 20px;
  .tag-heading {
    font-size: 1.8rem;
    letter-spacing: 0.5px;
    font-weight: bold;
    margin: 0 20px;
  }
  .tag-choice {
    font-size: 1.6rem;
    letter-spacing: 0.8px;
    margin: 0 20px;
    width: 100px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: ${props => (props.isFollowing ? 'crimson' : 'dodgerblue')};
    }
  }
`
