import React from 'react'
import { StyledFollow } from './StyledFollow'
import ScrollToTopOnMount from '../utils/ScrollToTopOnMount'

const Suggested = props => {
  const {
    userId,
    suggested,
    followAUser,
    fetchUser,
    fetchFollowing,
    fetchSuggested,
  } = props

  const handleFollow = async friend_id => {
    await followAUser({ user_id: userId, friend_id: friend_id })
    fetchSuggested(userId)
    fetchFollowing(userId)
    fetchUser(userId)
  }

  return (
    <StyledFollow>
      <ScrollToTopOnMount />
      {suggested.map((ele, index) => (
        <div key={index}>
          <h2>{ele.username}</h2>
          <img src={ele.image} alt='suggested' />
          <p>{ele.user}</p>
          <p style={{ textAlign: 'center' }}>
            Followed by {ele.followed_by_username}
          </p>
          <button onClick={() => handleFollow(ele.recommended_follow_id)}>
            Follow
          </button>
        </div>
      ))}
    </StyledFollow>
  )
}

export default Suggested
