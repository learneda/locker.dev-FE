import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { followAUser, unfollowAUser, fetchUser } from '../../actions'
import { StyledFollow } from '../social/StyledFollow'
import axios from 'axios'
import { post as URL } from '../../services/baseURL'

const UserFollowing = props => {
  const { userId, followAUser, unfollowAUser, fetchUser } = props

  const [toggles, setToggles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    console.log('MY FOLLOWING ', props.myFollowing)
    const myFollowingIdsArr = props.myFollowing.map(followingProfile => {
      return followingProfile.id
    })
    console.log(myFollowingIdsArr, 'FOOWLOING UD ARR')
    const toggles_arr = props.otherFollowing.map(profile =>
      myFollowingIdsArr.includes(profile.id)
    )
    setToggles(toggles_arr)
  }, [])

  // console.log(props.match.params.id);
  // console.log(toggles, 'toggles', following);

  const handleFollow = async (friend_id, index) => {
    const userId = props.auth.id
    setIsLoading(true)

    await followAUser({ user_id: userId, friend_id: friend_id })
    setIsLoading(false)

    setToggles(toggles.map((toggle, idx) => (idx === index ? !toggle : toggle)))
    // fetchUser(userId);
  }

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true)
    await unfollowAUser({ user_id: userId, friend_id: friend_id })
    setIsLoading(false)
    setToggles(toggles.map((toggle, idx) => (idx === index ? !toggle : toggle)))
    fetchUser(userId)
  }

  const handleClick = (id, index) => {
    return toggles[index] ? handleUnfollow(id, index) : handleFollow(id, index)
  }

  const renderSuggestion = (id, index) => {
    if (isLoading) {
      return <button style={{ width: '8.5rem' }}>...</button>
    }
    console.log(toggles, 'AYYYYYYYEEEEEEE')
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
    <StyledFollow style={{ marginTop: '30px' }}>
      {props.otherFollowing.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='friend' />
          </Link>
          {renderSuggestion(ele.id, index)}
          {ele.bio}
        </div>
      ))}
    </StyledFollow>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  {
    followAUser,
    unfollowAUser,
    fetchUser,
  }
)(UserFollowing)
