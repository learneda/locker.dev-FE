import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StyledFollow } from 'components/social/StyledFollow'

const OtherFollowing = props => {
  const {
    userId,
    following,
    userFollowing,
    followAUser,
    unfollowAUser,
    fetchFollowing,
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(null)
  const userFollowingIds = userFollowing.map(ele => ele.id)

  const handleFollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await followAUser({ user_id: userId, friend_id: friend_id })
    await fetchFollowing(userId)
    setIsLoading(false)
  }

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await unfollowAUser({ user_id: userId, friend_id: friend_id })
    await fetchFollowing(userId)
    setIsLoading(false)
  }

  const handleClick = (id, index) => {
    return userFollowingIds.includes(id)
      ? handleUnfollow(id, index)
      : handleFollow(id, index)
  }

  const renderSuggestion = (id, index) => {
    if (isLoading && loadingIndex === index) {
      return <button style={{ width: '8.5rem' }}>...</button>
    }
    if (userId === id) {
      return (
        <button style={{ cursor: 'not-allowed', width: '8.5rem' }}>
          It's you!
        </button>
      )
    } else {
      const text = userFollowingIds.includes(id) ? 'Unfollow' : 'Follow'
      return (
        <button
          style={{ width: '8.5rem' }}
          onClick={() => handleClick(id, index)}
        >
          {text}
        </button>
      )
    }
  }

  return (
    <StyledFollow>
      {following.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          {renderSuggestion(ele.id, index)}
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  )
}

export default OtherFollowing

OtherFollowing.propTypes = {
  userId: PropTypes.number.isRequired,
  following: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
      bio: PropTypes.string,
    })
  ).isRequired,
  userFollowing: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  followAUser: PropTypes.func.isRequired,
  unfollowAUser: PropTypes.func.isRequired,
  fetchFollowing: PropTypes.func.isRequired,
}
