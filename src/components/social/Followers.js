import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
} from '../../actions';
import { StyledFollow } from './StyledFollow';
import { Link } from 'react-router-dom';

const Followers = props => {
  const {
    userId,
    following,
    followers,
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserProfileDetails,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async friend_id => {
    setIsLoading(true);
    await followAUser({ user_id: userId, friend_id: friend_id });
    await getUserFollowing(userId);
    setIsLoading(false);
    getUserProfileDetails(userId);
  };

  const handleUnfollow = async friend_id => {
    setIsLoading(true);
    await unfollowAUser({ user_id: userId, friend_id: friend_id });
    getUserFollowing(userId);
    setIsLoading(false);
    getUserProfileDetails(userId);
  };

  const handleClick = id => {
    const followingIds = following.map(ele => ele.id);
    return followingIds.includes(id) ? handleUnfollow(id) : handleFollow(id);
  };

  const renderSuggestion = id => {
    if (isLoading) {
      return <button style={{ width: '8.5rem' }}>...</button>;
    }
    const followingIds = following.map(ele => ele.id);
    const text = followingIds.includes(id) ? 'Unfollow' : 'Follow';
    return (
      <button style={{ width: '8.5rem' }} onClick={() => handleClick(id)}>
        {text}
      </button>
    );
  };

  return (
    <StyledFollow>
      {followers.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='fan' />
          </Link>
          {renderSuggestion(ele.id)}
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  );
};

export default connect(
  null,
  { followAUser, unfollowAUser, getUserFollowing, getUserProfileDetails }
)(Followers);
