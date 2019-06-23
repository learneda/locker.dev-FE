import React from 'react'
import styled from 'styled-components'
import FollowingPlaceHolder from './FollowingPlaceholder'

const TagPageViewHeader = ({ isFollowing, unfollowTag, followTag, tag }) => {
  return isFollowing !== null ? (
    <Flex>
      <h1>{tag}</h1>
      <div
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

export default TagPageViewHeader

const Flex = styled.div`
  display: flex;
  position: sticky;
  top: 50px;
  background: white;
  justify-content: center;
  align-items: center;
  height: 70px;
  z-index: 1;
  border: 1px solid dodgerblue;
  margin-bottom: 20px;
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 20px;
  }
  div {
    font-size: 1.6rem;
    margin: 0 20px;
    width: 100px;
    display: flex;
    justify-content: center;
  }
`
