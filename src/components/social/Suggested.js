import React from 'react'

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
    <ul>
      {suggested.map((ele, index) => (
        <div style={{ outline: '1px solid salmon' }} key={index}>
          <li>{ele.username}</li>
          <img src={ele.image} alt='suggested' />
          <p>{ele.user}</p>
          <p>Followed by {ele.followed_by_username}</p>
          <p>From {ele.location}</p>
          <button onClick={() => handleFollow(ele.recommended_follow_id)}>
            Follow
          </button>
        </div>
      ))}
    </ul>
  )
}

export default Suggested
