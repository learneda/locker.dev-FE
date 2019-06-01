import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StyledFollow } from './StyledFollow'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const Following = props => {
  const {
    userId,
    following,
    followers,
    followAUser,
    unfollowAUser,
    fetchFollowing,
  } = props
  const [toggles, setToggles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(null)

  useEffect(() => {
    setToggles(Array(following.length).fill(true))
  }, [following])

  const handleFollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await followAUser({ user_id: userId, friend_id: friend_id })
    setToggles(toggles.map((toggle, idx) => (idx === index ? !toggle : toggle)))
    setIsLoading(false)
    fetchFollowing(userId)
  }

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await unfollowAUser({ user_id: userId, friend_id: friend_id })
    setToggles(toggles.map((toggle, idx) => (idx === index ? !toggle : toggle)))
    setIsLoading(false)
    fetchFollowing(userId)
  }

  const handleClick = (id, index) => {
    return toggles[index] ? handleUnfollow(id, index) : handleFollow(id, index)
  }

  const renderSuggestion = (id, index) => {
    if (isLoading && loadingIndex === index) {
      return <button style={{ width: '8.5rem' }}>...</button>
    }
    const text = toggles[index] ? 'Unfollow' : 'Follow'
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

export default Following
