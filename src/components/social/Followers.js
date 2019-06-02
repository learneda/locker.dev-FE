import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledFollow } from './StyledFollow'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const Followers = props => {
  const {
    userId,
    following,
    followers,
    followAUser,
    fetchUser,
    unfollowAUser,
    fetchFollowing,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(null)

  const handleFollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await followAUser({ user_id: userId, friend_id: friend_id })
    fetchFollowing(userId).then(() => setIsLoading(false))
    fetchUser(userId)
  }

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await unfollowAUser({ user_id: userId, friend_id: friend_id })
    fetchFollowing(userId).then(response => setIsLoading(false))
    fetchUser(userId)
  }

  const handleClick = (id, index) => {
    const followingIds = following.map(ele => ele.id)
    return followingIds.includes(id)
      ? handleUnfollow(id, index)
      : handleFollow(id, index)
  }

  const renderSuggestion = (id, index) => {
    if (isLoading && loadingIndex === index) {
      return <button style={{ width: '8.5rem' }}>...</button>
    }
    const followingIds = following.map(ele => ele.id)
    const text = followingIds.includes(id) ? 'Unfollow' : 'Follow'
    return (
      <button
        style={{ width: '8.5rem' }}
        onClick={() => handleClick(id, index)}
      >
        {text}
      </button>
    )
  }

  return (
    <StyledFollow>
      <ScrollToTopOnMount />
      {followers.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='fan' />
          </Link>
          {renderSuggestion(ele.id, index)}
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  )
}

export default Followers
